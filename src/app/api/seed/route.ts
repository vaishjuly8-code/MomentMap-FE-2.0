import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@shared/schema";

export const dynamic = 'force-dynamic';

const bengaluruEvents2026 = [
    // JANUARY
    { date: "2026-01-01", name: "New Year's Day", description: "Party hopping, rooftop brunches, nightlife", eventType: "social", intents: ["party", "casual"], fashionKeywords: { colors: ["silver", "gold", "black"], styles: ["glam", "party"], materials: ["sequin", "silk"], designs: ["mini", "bodycon"], mood: ["euphoric", "glamorous"] } },
    { date: "2026-01-06", name: "Sakat Chauth", description: "Quiet observance, temple visits", eventType: "festival", intents: ["festive", "spiritual"], fashionKeywords: { colors: ["red", "maroon", "yellow"], styles: ["ethnic", "traditional"], materials: ["cotton", "silk"], designs: ["saree", "salwar"], mood: ["serene", "devotional"] } },
    { date: "2026-01-12", name: "Pongal Begins", description: "Harvest food festivals, traditional food", eventType: "festival", intents: ["festive", "casual"], fashionKeywords: { colors: ["yellow", "orange", "green"], styles: ["ethnic", "south-indian"], materials: ["cotton", "linen"], designs: ["lungi", "saree"], mood: ["joyful", "traditional"] } },
    { date: "2026-01-13", name: "Lohri", description: "Bonfire nights, Punjabi music, winter fits", eventType: "festival", intents: ["festive", "party"], fashionKeywords: { colors: ["orange", "red", "mustard"], styles: ["ethnic fusion", "phulkari"], materials: ["wool", "velvet"], designs: ["salwar", "jacket"], mood: ["vibrant", "festive"] } },
    { date: "2026-01-14", name: "Makar Sankranti", description: "Kite flying, rooftop scenes, aesthetic reels", eventType: "festival", intents: ["festive", "casual"], fashionKeywords: { colors: ["yellow", "orange", "white"], styles: ["boho", "casual-ethnic"], materials: ["cotton"], designs: ["kurta", "coord"], mood: ["breezy", "playful"] } },
    { date: "2026-01-16", name: "BLR Hubba 2026 Begins", description: "Art pop-ups, performances, workshops", eventType: "festival", intents: ["casual", "shopping"], fashionKeywords: { colors: ["earthy", "teal", "rust"], styles: ["artsy", "indie"], materials: ["linen", "canvas"], designs: ["overalls", "co-ord"], mood: ["creative", "expressive"] } },
    { date: "2026-01-16", name: "Shankar-Ehsaan-Loy Live", description: "Bollywood nostalgia, sing-along crowd", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["black", "gold", "purple"], styles: ["concert casual", "retro"], materials: ["denim", "satin"], designs: ["wide-leg", "blazer"], mood: ["nostalgic", "festive"] } },
    { date: "2026-01-17", name: "Candlelight Tribute to KK", description: "Soft-girl / soft-boy energy, emotional", eventType: "concert", intents: ["casual", "date"], fashionKeywords: { colors: ["blush", "beige", "ivory"], styles: ["soft", "dreamy"], materials: ["chiffon", "satin"], designs: ["midi", "slip"], mood: ["emotional", "romantic"] } },
    { date: "2026-01-17", name: "Candlelight Tribute to Arijit Singh", description: "Romantic vibes, chill night plans", eventType: "concert", intents: ["casual", "date"], fashionKeywords: { colors: ["dusty rose", "mauve", "white"], styles: ["soft romantic", "minimalist"], materials: ["georgette", "chiffon"], designs: ["wrap dress", "flowy"], mood: ["romantic", "intimate"] } },
    { date: "2026-01-18", name: "Beat the Bull Run + Suggi Festival", description: "Fitness meets culture, community energy", eventType: "social", intents: ["casual", "sports"], fashionKeywords: { colors: ["neon", "white", "black"], styles: ["athleisure", "sporty"], materials: ["nylon", "spandex"], designs: ["leggings", "crop"], mood: ["energetic", "community"] } },
    { date: "2026-01-23", name: "Linkin Park Live", description: "Alt-rock, core Gen-Z nostalgia", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["black", "grey", "red"], styles: ["grunge", "rock"], materials: ["denim", "leather"], designs: ["band tee", "cargo"], mood: ["edgy", "rebellious"] } },
    { date: "2026-01-23", name: "Chrizellenz (Christ University)", description: "Campus energy, music, fashion student hype", eventType: "social", intents: ["party", "casual"], fashionKeywords: { colors: ["vibrant", "mixed"], styles: ["streetwear", "campus"], materials: ["cotton", "denim"], designs: ["graphic tee", "joggers"], mood: ["youthful", "energetic"] } },
    { date: "2026-01-23", name: "Basant Panchami", description: "Yellow fits, art & learning symbolism", eventType: "festival", intents: ["festive"], fashionKeywords: { colors: ["yellow", "saffron", "white"], styles: ["ethnic", "festive"], materials: ["silk", "cotton"], designs: ["kurta", "saree"], mood: ["joyful", "spiritual"] } },
    { date: "2026-01-24", name: "Candlelight Tribute to A.R. Rahman", description: "Soulful, cinematic night plans", eventType: "concert", intents: ["casual", "date"], fashionKeywords: { colors: ["ivory", "champagne", "gold"], styles: ["cinematic", "elegant"], materials: ["silk", "velvet"], designs: ["gown", "blazer"], mood: ["soulful", "cinematic"] } },
    { date: "2026-01-26", name: "Republic Day", description: "Patriotic events, parades", eventType: "festival", intents: ["festive", "patriotic"], fashionKeywords: { colors: ["saffron", "white", "green"], styles: ["patriotic", "ethnic"], materials: ["khadi", "cotton"], designs: ["kurta", "salwar"], mood: ["proud", "patriotic"] } },
    { date: "2026-01-29", name: "BIFFes Begins", description: "Indie cinema, global films, cinephile culture", eventType: "social", intents: ["casual"], fashionKeywords: { colors: ["black", "white", "navy"], styles: ["intellectual", "minimalist"], materials: ["linen", "cotton"], designs: ["straight cut", "turtleneck"], mood: ["artistic", "intellectual"] } },

    // FEBRUARY
    { date: "2026-02-01", name: "Hanumankind Live", description: "Late-night energy, local gig culture", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["black", "gold", "neon"], styles: ["hip-hop", "streetwear"], materials: ["denim", "leather"], designs: ["oversized", "cargo"], mood: ["electric", "hype"] } },
    { date: "2026-02-07", name: "🌹 Rose Day", description: "Give roses to express love, friendship, admiration", eventType: "social", intents: ["gifting", "date"], fashionKeywords: { colors: ["red", "pink", "rose gold"], styles: ["romantic", "feminine"], materials: ["satin", "lace"], designs: ["wrap dress", "floral"], mood: ["romantic", "playful"] } },
    { date: "2026-02-07", name: "ICC Cricket T20 WC Begins", description: "Cricket world cup fever", eventType: "social", intents: ["casual", "sports"], fashionKeywords: { colors: ["blue", "yellow", "white"], styles: ["sporty", "fan wear"], materials: ["jersey", "cotton"], designs: ["jersey tee", "shorts"], mood: ["enthusiastic", "sporty"] } },
    { date: "2026-02-08", name: "💍 Propose Day", description: "A day to confess feelings or pop the question", eventType: "social", intents: ["date"], fashionKeywords: { colors: ["blush", "ivory", "gold"], styles: ["elegant", "romantic"], materials: ["silk", "satin"], designs: ["midi dress", "suit"], mood: ["nervous", "romantic"] } },
    { date: "2026-02-08", name: "DJ Snake Concert", description: "EDM dance party energy", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["neon", "black", "silver"], styles: ["rave", "festival"], materials: ["lycra", "metallic"], designs: ["two-piece", "bodysuit"], mood: ["euphoric", "wild"] } },
    { date: "2026-02-09", name: "🍫 Chocolate Day", description: "Share chocolates with that special someone", eventType: "social", intents: ["gifting", "date"], fashionKeywords: { colors: ["brown", "gold", "cream"], styles: ["cozy", "romantic"], materials: ["knit", "velvet"], designs: ["sweater", "midi"], mood: ["warm", "sweet"] } },
    { date: "2026-02-09", name: "AITA Talent Series Begins", description: "Youth sports tournament", eventType: "social", intents: ["casual", "sports"], fashionKeywords: { colors: ["white", "blue", "green"], styles: ["athletic", "sporty"], materials: ["polyester", "spandex"], designs: ["polo", "shorts"], mood: ["competitive", "energy"] } },
    { date: "2026-02-10", name: "🧸 Teddy Day", description: "Gift a cute teddy to show warmth and care", eventType: "social", intents: ["gifting", "date"], fashionKeywords: { colors: ["pink", "beige", "cream"], styles: ["cute", "kawaii"], materials: ["cotton", "fleece"], designs: ["puffer", "oversized"], mood: ["cute", "cozy"] } },
    { date: "2026-02-11", name: "🤝 Promise Day", description: "Make meaningful promises to strengthen bonds", eventType: "social", intents: ["date"], fashionKeywords: { colors: ["white", "sky blue", "lavender"], styles: ["soft", "minimal"], materials: ["cotton", "linen"], designs: ["shirt", "straight cut"], mood: ["sincere", "soft"] } },
    { date: "2026-02-12", name: "🤗 Hug Day", description: "Celebrate closeness with a warm hug", eventType: "social", intents: ["date"], fashionKeywords: { colors: ["peach", "coral", "nude"], styles: ["casual chic", "comfortable"], materials: ["jersey", "cotton"], designs: ["hoodie", "coord"], mood: ["warm", "cozy"] } },
    { date: "2026-02-13", name: "💋 Kiss Day", description: "Share a kiss to express affection and intimacy", eventType: "social", intents: ["date"], fashionKeywords: { colors: ["red", "burgundy", "black"], styles: ["seductive", "chic"], materials: ["velvet", "satin"], designs: ["bodycon", "off-shoulder"], mood: ["bold", "intimate"] } },
    { date: "2026-02-14", name: "Valentine's Day", description: "Date nights, intimate candlelight concerts", eventType: "social", intents: ["party", "date", "gifting"], fashionKeywords: { colors: ["red", "pink", "rose"], styles: ["romantic", "glam"], materials: ["silk", "satin"], designs: ["mini dress", "bodycon"], mood: ["romantic", "passionate"] } },
    { date: "2026-02-15", name: "Maha Shivaratri", description: "Deep-night vigils, spiritual nights", eventType: "festival", intents: ["festive", "spiritual"], fashionKeywords: { colors: ["white", "blue", "saffron"], styles: ["ethnic", "spiritual"], materials: ["cotton", "silk"], designs: ["dhoti", "kurta"], mood: ["spiritual", "meditative"] } },
    { date: "2026-02-15", name: "Cry-It-Out Day", description: "Emotional release day for Gen Z", eventType: "social", intents: ["casual"], fashionKeywords: { colors: ["grey", "blue", "black"], styles: ["cozy", "comfort"], materials: ["fleece", "jersey"], designs: ["hoodie", "sweatpants"], mood: ["introspective", "cozy"] } },
    { date: "2026-02-17", name: "Bangalore AI Forum", description: "Tech conference / networking", eventType: "social", intents: ["casual", "professional"], fashionKeywords: { colors: ["navy", "white", "grey"], styles: ["smart casual", "professional"], materials: ["cotton", "linen"], designs: ["blazer", "chinos"], mood: ["confident", "professional"] } },
    { date: "2026-02-22", name: "Anuv Jain Concert", description: "Dastakhat India Tour", eventType: "concert", intents: ["casual", "date"], fashionKeywords: { colors: ["earth tones", "beige", "rust"], styles: ["indie", "bohemian"], materials: ["linen", "cotton"], designs: ["flowy", "relaxed"], mood: ["dreamy", "artistic"] } },
    { date: "2026-02-26", name: "INDIAWOOD 2026 Begins", description: "Major industry expo", eventType: "social", intents: ["casual"], fashionKeywords: { colors: ["neutral", "brown", "beige"], styles: ["business casual"], materials: ["cotton", "linen"], designs: ["formal shirt", "trousers"], mood: ["professional", "focused"] } },

    // MARCH
    { date: "2026-03-01", name: "That Girl Reset Day", description: "Self-care and productivity reset", eventType: "social", intents: ["casual"], fashionKeywords: { colors: ["white", "sage", "blush"], styles: ["that girl", "clean girl"], materials: ["cotton", "linen"], designs: ["co-ord", "leggings"], mood: ["fresh", "motivated"] } },
    { date: "2026-03-04", name: "Holi", description: "Festival of colors and joy", eventType: "festival", intents: ["party", "festive", "casual"], fashionKeywords: { colors: ["rainbow", "white", "vibrant"], styles: ["festive", "boho"], materials: ["cotton", "linen"], designs: ["kurta", "coord"], mood: ["joyful", "celebratory"] } },
    { date: "2026-03-04", name: "Joel Veena Live", description: "Indian classical fusion at BIC", eventType: "concert", intents: ["casual"], fashionKeywords: { colors: ["emerald", "gold", "ivory"], styles: ["fusion", "elegant"], materials: ["silk", "georgette"], designs: ["saree", "indo-western"], mood: ["cultural", "refined"] } },
    { date: "2026-03-06", name: "Harry Styles Album Release", description: "Album drop party vibe", eventType: "pop-culture", intents: ["party", "casual"], fashionKeywords: { colors: ["pastels", "vintage", "retro"], styles: ["cottagecore", "retro"], materials: ["velvet", "floral"], designs: ["flare pants", "vintage"], mood: ["fun", "expressive"] } },
    { date: "2026-03-08", name: "ICC Cricket T20 WC Final", description: "Major cricket final energy", eventType: "social", intents: ["casual", "sports"], fashionKeywords: { colors: ["blue", "orange", "patriotic"], styles: ["fan", "sporty"], materials: ["jersey"], designs: ["tee", "shorts"], mood: ["intense", "nationalistic"] } },
    { date: "2026-03-12", name: "AI DevCon 2026", description: "NIMHANS tech summit", eventType: "social", intents: ["casual", "professional"], fashionKeywords: { colors: ["tech grey", "clean white", "navy"], styles: ["smart casual", "techwear"], materials: ["cotton", "tech fabric"], designs: ["polo", "chinos"], mood: ["innovative", "smart"] } },
    { date: "2026-03-14", name: "Sanam Live", description: "Bollywood pop concert", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["vibrant", "col ourful", "neon"], styles: ["bollywood", "party"], materials: ["sequin", "satin"], designs: ["crop top", "coord"], mood: ["fun", "danceable"] } },
    { date: "2026-03-14", name: "Osho Jain Live", description: "Indie singer-songwriter night", eventType: "concert", intents: ["casual", "date"], fashionKeywords: { colors: ["muted", "earthy", "denim"], styles: ["indie", "casual"], materials: ["denim", "cotton"], designs: ["shirt", "flare"], mood: ["chill", "artistic"] } },
    { date: "2026-03-19", name: "Navratri Begins (Day 1)", description: "Festive dance and music begins", eventType: "festival", intents: ["party", "festive"], fashionKeywords: { colors: ["red", "royal blue", "yellow"], styles: ["garba", "chaniya choli"], materials: ["silk", "embroidered"], designs: ["lehenga", "chaniya"], mood: ["festive", "energetic"] } },
    { date: "2026-03-21", name: "Eid-ul-Fitr", description: "Community celebration and gifting", eventType: "festival", intents: ["festive", "gifting"], fashionKeywords: { colors: ["white", "green", "gold"], styles: ["ethnic", "traditional"], materials: ["silk", "chikankari"], designs: ["kurta", "anarkali"], mood: ["joyful", "grateful"] } },
    { date: "2026-03-26", name: "IPL 2026 Season Begins", description: "T20 cricket hype", eventType: "social", intents: ["casual", "sports"], fashionKeywords: { colors: ["team colors", "vibrant"], styles: ["sporty", "fan"], materials: ["jersey", "polyester"], designs: ["jersey", "cap"], mood: ["excited", "competitive"] } },
    { date: "2026-03-29", name: "Karan Aujla Concert", description: "Punjabi music live", eventType: "concert", intents: ["party", "casual"], fashionKeywords: { colors: ["black", "gold", "white"], styles: ["hip-hop", "punjabi"], materials: ["denim", "leather"], designs: ["oversized", "cargo"], mood: ["swag", "hype"] } },

    // OCTOBER
    { date: "2026-10-31", name: "Halloween", description: "Costume parties and nightlife", eventType: "pop-culture", intents: ["party", "casual"], fashionKeywords: { colors: ["black", "orange", "purple"], styles: ["costume", "gothic", "spooky"], materials: ["mesh", "pvc", "leather"], designs: ["costume", "corset"], mood: ["spooky", "fun"] } },

    // DECEMBER
    { date: "2026-12-25", name: "Christmas", description: "Festive celebration and gifting", eventType: "festival", intents: ["festive", "gifting", "party"], fashionKeywords: { colors: ["red", "green", "gold", "white"], styles: ["festive", "cozy glam"], materials: ["velvet", "faux fur"], designs: ["dress", "suits"], mood: ["festive", "joyful"] } },
    { date: "2026-12-31", name: "New Year's Eve", description: "Year-end party energy", eventType: "social", intents: ["party", "casual"], fashionKeywords: { colors: ["gold", "silver", "black"], styles: ["glam", "party"], materials: ["sequin", "satin"], designs: ["mini dress", "blazer"], mood: ["celebratory", "euphoric"] } },
];

export async function GET() {
    try {
        const existing = await storage.getEvents();
        if (existing.length < 10) {
            // Clear and re-seed
            try { await db.delete(events); } catch (_) { }
            for (const e of bengaluruEvents2026) {
                await storage.createEvent({
                    ...e,
                    audience: "Gen Z",
                    vibe: e.fashionKeywords.mood,
                });
            }
            return NextResponse.json({ status: "seeded", count: bengaluruEvents2026.length });
        }
        return NextResponse.json({ status: "already_seeded", count: existing.length });
    } catch (err) {
        console.error("Seed error:", err);
        return NextResponse.json({ message: "Seed failed" }, { status: 500 });
    }
}
