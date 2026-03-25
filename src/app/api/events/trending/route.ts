import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

/**
 * GET /api/events/trending?date=YYYY-MM-DD
 *
 * Returns trending topics/events for a given date using Google Trends.
 * This is a best-effort enrichment layer — future integrations with
 * BookMyShow, District App, and Instagram can be plugged in here.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

        // --- Google Trends Integration (via SerpApi or google-trends-api) ---
        // Stub: In production, replace this with an actual Google Trends API call.
        // Example using SerpApi:
        //   const res = await fetch(`https://serpapi.com/search.json?engine=google_trends&q=fashion+india&date=...&api_key=${SERPAPI_KEY}`)
        //
        // Stub response — simulate trending topics around the given date
        const trends = {
            date,
            source: "stub",
            note: "Connect a Google Trends / SerpApi key via SERPAPI_KEY env var for live data.",
            trending: [
                { keyword: "Festive fashion India", volume: "high" },
                { keyword: "Ethnic wear Bengaluru", volume: "medium" },
                { keyword: "Bollywood inspired outfits", volume: "medium" },
                { keyword: "Summer kurta collection", volume: "high" },
                { keyword: "Indo-western fashion", volume: "medium" },
            ],
            // Future: BookMyShow events, District gigs, Instagram reels
            bookMyShow: { note: "Requires BookMyShow API partnership" },
            districtApp: { note: "Requires District App API partnership" },
            instagram: { note: "Requires Instagram Graph API access" },
        };

        return NextResponse.json(trends);
    } catch (err) {
        console.error("Trending error:", err);
        return NextResponse.json({ message: "Failed to fetch trends" }, { status: 500 });
    }
}
