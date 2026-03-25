import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Event, type InsertEvent } from "@shared/routes";

// GET /api/events
export function useEvents(range?: { start: string; end: string }) {
    return useQuery({
        queryKey: [api.events.list.path, range],
        queryFn: async () => {
            const url = range
                ? buildUrl(api.events.list.path) + `?start=${range.start}&end=${range.end}`
                : api.events.list.path;

            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch events");
            return res.json() as Promise<Event[]>;
        },
    });
}

// GET /api/events/:date  → returns Event[] (all events for that date)
export function useEventsByDate(date: string) {
    return useQuery({
        queryKey: ["events-by-date", date],
        queryFn: async () => {
            if (!date) return [] as Event[];
            const res = await fetch(`/api/events/${date}`, { credentials: "include" });
            if (res.status === 404) return [] as Event[];
            if (!res.ok) throw new Error("Failed to fetch events");
            return res.json() as Promise<Event[]>;
        },
        enabled: !!date,
    });
}

// Legacy single-event hook (kept for backward compat)
export function useEventByDate(date: string) {
    const { data, ...rest } = useEventsByDate(date);
    return { data: data?.[0], ...rest };
}

// POST /api/events/generate
export function useGenerateEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { date: string; context?: string }) => {
            const res = await fetch(api.events.generate.path, {
                method: api.events.generate.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to generate event");
            return res.json() as Promise<Event>;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [api.events.list.path] });
            queryClient.invalidateQueries({ queryKey: ["events-by-date", data.date] });
        },
    });
}

// GET /api/recommendations
export function useRecommendations(date: string, tab?: string, eventId?: number) {
    return useQuery({
        queryKey: [api.recommendations.get.path, date, tab, eventId],
        queryFn: async () => {
            let url = buildUrl(api.recommendations.get.path) + `?date=${date}`;
            if (tab) url += `&tab=${tab}`;
            if (eventId) url += `&eventId=${eventId}`;

            const res = await fetch(url, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch recommendations");
            return res.json();
        },
        enabled: !!date,
    });
}

// POST /api/events/marketing  (AI-generated marketing content)
export function useMarketingContent(eventId: number | null) {
    return useQuery({
        queryKey: ["marketing-content", eventId],
        queryFn: async () => {
            const res = await fetch("/api/events/marketing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });
            if (!res.ok) throw new Error("Failed to generate marketing content");
            return res.json() as Promise<{
                app: {
                    headline: string;
                    subtext: string;
                    cta: string;
                    targetSegment: string;
                    pushNotification: string;
                };
                social: {
                    caption: string;
                    hashtags: string[];
                    reelHook: string;
                    storyText: string;
                    contentIdeas: string[];
                };
            }>;
        },
        enabled: !!eventId,
        staleTime: Infinity, // Don't re-fetch, AI content is expensive
    });
}
