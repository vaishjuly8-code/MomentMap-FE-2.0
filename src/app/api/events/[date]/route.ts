import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

type Params = Promise<{ date: string }>

export async function GET(
    req: Request,
    { params }: { params: Params }
) {
    const { date } = await params;
    // Return ALL events for this date as an array
    const events = await storage.getEventsByDate(date);
    if (!events.length) {
        return NextResponse.json({ message: "No event found for this date" }, { status: 404 });
    }
    return NextResponse.json(events);
}
