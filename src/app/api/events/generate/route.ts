import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { date } = await req.json();
        const event = await storage.getEventByDate(date);
        if (!event) return NextResponse.json({ message: "Event not found in static calendar." }, { status: 404 });
        return NextResponse.json(event);
    } catch (err) {
        console.error("AI Generation Error:", err);
        return NextResponse.json({ message: "Failed to fetch event" }, { status: 500 });
    }
}
