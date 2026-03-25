import OpenAI from "openai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY_USER || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
            baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        });

        const { name, description, category } = await req.json();
        const analyzePrompt = `Analyze product: ${name}\nDescription: ${description}\nCategory: ${category}. Return JSON with color, style, vibe (semicolon separated), occasion (array), season (array), category, description, material.`;
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: analyzePrompt }],
            response_format: { type: "json_object" }
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
    } catch (err) {
        console.error("AI Product Analyzer Error:", err);
        return NextResponse.json({ message: "Failed to analyze product" }, { status: 500 });
    }
}
