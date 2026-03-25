import OpenAI from "openai";
import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY_USER || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
            baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        });

        const { eventId } = await req.json();

        if (!eventId) {
            return NextResponse.json({ message: "eventId is required" }, { status: 400 });
        }

        // Fetch all events and find the one with the given ID
        const allEvents = await storage.getEvents();
        const event = allEvents.find(e => e.id === eventId);

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        const prompt = `
You are a fashion and lifestyle marketing expert for an Indian D2C fashion brand.

Generate marketing campaign content for the following event:
- Event Name: ${event.name}
- Date: ${event.date}
- Description: ${event.description}
- Event Type: ${event.eventType}
- Vibe: ${event.vibe?.join(", ") || "N/A"}
- Fashion Keywords: Colors: ${event.fashionKeywords?.colors?.join(", ") || "N/A"}, Styles: ${event.fashionKeywords?.styles?.join(", ") || "N/A"}, Mood: ${event.fashionKeywords?.mood?.join(", ") || "N/A"}

Return a JSON object with exactly this structure:
{
  "app": {
    "headline": "Short punchy headline for in-app banner (max 10 words)",
    "subtext": "Supporting line for in-app campaign (max 20 words)",
    "cta": "Call-to-action button text (max 5 words)",
    "targetSegment": "Who to target (e.g., Gen Z women in metros)",
    "pushNotification": "Short push notification copy (max 15 words)"
  },
  "social": {
    "caption": "Instagram/Facebook caption with emojis (max 50 words)",
    "hashtags": ["array", "of", "10", "relevant", "hashtags"],
    "reelHook": "First 3 seconds of a reel hook line (max 10 words)",
    "storyText": "Story slide text (max 15 words)",
    "contentIdeas": ["3 content ideas for this event"]
  }
}

Only return valid JSON, no markdown.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0].message.content || "{}";
        const data = JSON.parse(content);

        return NextResponse.json(data);
    } catch (err) {
        console.error("Marketing generation error:", err);
        return NextResponse.json({ message: "Failed to generate marketing content" }, { status: 500 });
    }
}
