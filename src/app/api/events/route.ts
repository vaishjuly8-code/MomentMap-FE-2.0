import { NextResponse } from "next/server";
import { STATIC_EVENTS } from "@/lib/static-events";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    // Try database first
    try {
        const { storage } = await import("@/lib/storage");
        let events = await storage.getEvents();

        // If DB has no events, auto-seed with static data (returns static directly)
        if (events.length === 0) {
            events = STATIC_EVENTS as any;
        }

        if (start && end) {
            events = events.filter(e => e.date >= start && e.date <= end);
        }

        return NextResponse.json(events);
    } catch (_) {
        // DB not available — serve static data
        let events: any[] = STATIC_EVENTS;
        if (start && end) {
            events = events.filter(e => e.date >= start && e.date <= end);
        }
        return NextResponse.json(events);
    }
}
