import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");
        const tab = searchParams.get("tab");
        const eventId = searchParams.get("eventId"); // optional — for multi-event days

        if (!date) {
            return NextResponse.json({ message: "Date is required" }, { status: 400 });
        }

        // Use eventId to pick the right event if provided, otherwise fall back to first for that date
        let event;
        if (eventId) {
            const allForDate = await storage.getEventsByDate(date);
            event = allForDate.find(e => e.id === parseInt(eventId)) ?? allForDate[0];
        } else {
            event = await storage.getEventByDate(date);
        }
        if (!event) {
            return NextResponse.json({ message: "Event not found for this date." }, { status: 404 });
        }

        const products = await storage.getProducts();

        const scoredProducts = products.map(p => {
            let score = 0;
            const matchReasons: string[] = [];
            const productOccasions = (p.occasion as any) || [];
            const eventIntents = event.intents || [];

            const hasOccasionMatch = productOccasions.some((occ: string) =>
                eventIntents.some(intent => {
                    const occLower = occ.toLowerCase();
                    const intentLower = intent.toLowerCase();
                    return occLower.includes(intentLower) || intentLower.includes(occLower);
                })
            );

            if (!hasOccasionMatch) return { product: p, score: 0, matchReasons: [] };

            score += 50; // Base match score
            matchReasons.push(`Occasion match: ${productOccasions.join(", ")}`);

            const productVibes = p.vibe?.toLowerCase().split(';').map(v => v.trim()) || [];
            const eventMoods = event.fashionKeywords?.mood?.map(m => m.toLowerCase()) || [];
            const vibeMatches = productVibes.filter(vibe => eventMoods.some(mood => mood.includes(vibe)));

            if (vibeMatches.length > 0) {
                score += 15;
                matchReasons.push(`Vibe match: ${vibeMatches.join(", ")}`);
            }

            return { product: p, score, matchReasons };
        });

        let filtered = scoredProducts;
        if (tab && tab !== "all") {
            filtered = scoredProducts.filter(sp => {
                const productOccasions = (sp.product.occasion as string[]) || [];
                const tabLower = tab.toLowerCase();
                return productOccasions.some((occ: string) => occ.toLowerCase().includes(tabLower));
            });
        }

        const recommended = filtered
            .filter(sp => sp.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(sp => ({ ...sp.product, matchScore: sp.score, matchReasons: sp.matchReasons }));

        return NextResponse.json(recommended);
    } catch (err) {
        console.error("Recommendation Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
