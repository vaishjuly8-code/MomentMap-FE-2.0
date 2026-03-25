import { storage } from "./storage";
import { db } from "./db";
import { events } from "@shared/schema";

async function seedDatabase() {
    console.log("Checking database...");
    const products = await storage.getProducts();
    if (products.length === 0) {
        console.log("Seeding initial product inventory...");
        const userProducts = [
            { name: "Red Ditsy Floral Maxi Dress", category: "Dresses", price: 149900, imageUrl: "https://drive.google.com/uc?id=1qr7r-eY7mu-KxCEjGlqnG1GYCKrU2Bdf", color: "Red", style: "Boho", vibe: "Romantic; Playful; Feminine", audience: "Gen Z", material: "Cotton", description: "Flowy maxi dress", occasion: ["casual", "brunch", "date"], season: ["spring", "summer"] },
            { name: "Black Square Neck Sheath Mini Dress", category: "Dresses", price: 189900, imageUrl: "https://drive.google.com/uc?id=19RGInpLEmoqfFB3pSk9dA8Rk_MuwgTre", color: "Black", style: "Modern", vibe: "Bold; Confident", audience: "Gen Z", material: "Polyester", description: "Bodycon mini dress", occasion: ["party", "club", "date night"], season: ["autumn", "winter"] },
            { name: "Blue Floral Strappy Pleated Short Dress", category: "Dresses", price: 129900, imageUrl: "https://drive.google.com/uc?id=180ZJbg1mHNzpVookKp8Kabal4soj1WUe", color: "Blue", style: "Resort", vibe: "Fresh; Mediterranean", audience: "Gen Z", material: "Cotton", description: "Sleeveless flared dress", occasion: ["vacation", "resort", "brunch"], season: ["spring", "summer"] },
            { name: "Pink Ethnic Floral Strappy Maxi Dress", category: "Dresses", price: 159900, imageUrl: "https://drive.google.com/uc?id=1T7b1917rgJGAwVLEkF-EJAfSNRcifozI", color: "Pink", style: "Ethnic Fusion", vibe: "Soft Feminine", audience: "Gen Z", material: "Rayon", description: "Flowing ethnic maxi", occasion: ["festive", "family gatherings"], season: ["spring", "summer"] },
            { name: "Mens Print Oversize T-Shirt", category: "Tops", price: 79900, imageUrl: "https://drive.google.com/uc?id=1wauWpiiHPnM97EcH3q3gnVCPFLHAvmDR", color: "White", style: "Streetwear", vibe: "Cool; Pop-culture", audience: "Gen Z", material: "Cotton", description: "Oversized tee", occasion: ["casual", "college"], season: ["all season"] },
            { name: "Men Grey Printed Slim Fit T-shirt", category: "Tops", price: 89900, imageUrl: "https://drive.google.com/uc?id=1qpPkbT3bfrHwmfWPbtCzm9ybc-CW62CJ", color: "Grey", style: "Streetwear", vibe: "Edgy; Masculine", audience: "Gen Z", material: "Cotton", description: "Slim fit tee", occasion: ["casual", "streetwear"], season: ["all season"] },
            { name: "Men's Pure Cotton Polo T-Shirt", category: "Tops", price: 99900, imageUrl: "https://drive.google.com/uc?id=1i06muPKyMsZoIGEIy2KkMFDf8-6Zxe2i", color: "Green", style: "Smart Casual", vibe: "Clean; Polished", audience: "Gen Z", material: "Cotton", description: "Classic polo shirt", occasion: ["casual", "office"], season: ["spring", "summer"] },
            { name: "Women Black Cotton Wide Leg Trousers", category: "Bottoms", price: 179900, imageUrl: "https://drive.google.com/uc?id=1rD73C6y9J6tm1DpAV7pPtLx6J4X1eZ4i", color: "Black", style: "Tailored", vibe: "Powerful; Elegant", audience: "Gen Z", material: "Cotton", description: "Tailored trousers", occasion: ["office", "evening"], season: ["all season"] },
            { name: "Side Slit Knitted Skirt", category: "Bottoms", price: 119900, imageUrl: "https://drive.google.com/uc?id=1ibVm9RD9ohTqqunZBkVFadlNMp9yneV9", color: "Black", style: "Casual", vibe: "Chic; Minimal", audience: "Gen Z", material: "Knit", description: "Knit skirt with slit", occasion: ["casual", "brunch"], season: ["spring", "summer"] },
            { name: "Black High Waist Criss-Cross Treggings", category: "Bottoms", price: 99900, imageUrl: "https://drive.google.com/uc?id=11hf7i9ThAtqK3HT2DIoa7UL2cilazEZr", color: "Black", style: "Athleisure", vibe: "Sporty Chic", audience: "Gen Z", material: "Nylon Blend", description: "Elastic fit treggings", occasion: ["casual", "gym"], season: ["all season"] },
            { name: "RCB Training Tee - Sleeveless Activewear", category: "Tops", price: 79900, imageUrl: "https://drive.google.com/uc?id=1WXYk9Imyd9kUUBY8Onc6oTX1mLTTMZDf", color: "Red/Blue", style: "Sports", vibe: "High Energy", audience: "Gen Z", material: "Polyester", description: "RCB sports tee", occasion: ["casual", "sports"], season: ["all season"] },
            { name: "Pearl JHUMKA Earrings - Chandbali", category: "Accessories", price: 49900, imageUrl: "https://drive.google.com/uc?id=1PkhkzRJ4UfFMoNRaYKQXjVqSH1xOeYYX", color: "Golden", style: "Ethnic", vibe: "Regal; Traditional", audience: "Gen Z", material: "Gold Plated", description: "Traditional jhumka", occasion: ["festive", "wedding"], season: ["all season"] },
            { name: "Gold Plated Golden Infinity Necklace", category: "Accessories", price: 39900, imageUrl: "https://drive.google.com/uc?id=1TnAUwQwXGGXZE_xB37-T0Ho2EaxXAbH-", color: "Golden", style: "Minimal", vibe: "Modern; Symbolic", audience: "Gen Z", material: "Gold Plated", description: "Infinity necklace", occasion: ["casual", "office", "gifting"], season: ["all season"] },
            { name: "Gold Plated Ribbon Necklace", category: "Accessories", price: 34900, imageUrl: "https://drive.google.com/uc?id=1SNsLpi0hyD0R7rs05aT1ETB1xc53Y66Y", color: "Golden", style: "Dainty", vibe: "Cute; Feminine", audience: "Gen Z", material: "Gold Plated", description: "Ribbon necklace", occasion: ["gifting", "casual"], season: ["all season"] },
            { name: "Gold Plated Minimalist Heart Stud Earrings", category: "Accessories", price: 29900, imageUrl: "https://drive.google.com/uc?id=13x1I6jupjDz1izg4-tgZHeAjG2ondCYw", color: "Golden", style: "Minimal", vibe: "Cute; Romantic", audience: "Gen Z", material: "Gold Plated", description: "Heart stud earrings", occasion: ["casual", "gifting"], season: ["all season"] }
        ];
        for (const p of userProducts) await storage.createProduct(p);
    }

    const existingEvents = await storage.getEvents();
    if (existingEvents.length < 10) {
        console.log("Seeding 2026 comprehensive Bengaluru event calendar...");
        try { await db.delete(events); } catch (e) { }
        const bengaluruEvents2026 = [
            { date: "2026-01-01", name: "New Year’s Day", description: "Party hopping, rooftop brunches, nightlife", eventType: "social", intents: ["party", "casual"] },
            { date: "2026-01-06", name: "Sakat Chauth", description: "Quiet observance, temple visits", eventType: "festival", intents: ["festive", "spiritual"] },
            { date: "2026-01-12", name: "Pongal Begins", description: "Harvest food festivals, traditional food", eventType: "festival", intents: ["festive", "casual"] },
            { date: "2026-01-13", name: "Lohri", description: "Bonfire nights, Punjabi music, winter fits", eventType: "festival", intents: ["festive", "party"] },
            { date: "2026-01-14", name: "Makar Sankranti", description: "Kite flying, rooftop scenes, aesthetic reels", eventType: "festival", intents: ["festive", "casual"] },
            { date: "2026-01-16", name: "BLR Hubba 2026 Begins", description: "Art pop-ups, performances, workshops", eventType: "festival", intents: ["casual", "shopping"] },
            { date: "2026-01-16", name: "Shankar-Ehsaan-Loy Live", description: "Bollywood nostalgia, sing-along crowd", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-01-17", name: "Candlelight Tribute to KK", description: "Soft-girl / soft-boy energy, emotional", eventType: "concert", intents: ["casual", "date"] },
            { date: "2026-01-17", name: "Candlelight Tribute to Arijit Singh", description: "Romantic vibes, chill night plans", eventType: "concert", intents: ["casual", "date"] },
            { date: "2026-01-18", name: "Beat the Bull Run + Suggi Festival", description: "Fitness meets culture, community energy", eventType: "social", intents: ["casual", "sports"] },
            { date: "2026-01-23", name: "Linkin Park Live", description: "Alt-rock, core Gen-Z nostalgia", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-01-23", name: "Chrizellenz (Christ University) Begins", description: "Campus energy, music, fashion student hype", eventType: "social", intents: ["party", "casual"] },
            { date: "2026-01-23", name: "Basant Panchami", description: "Yellow fits, art & learning symbolism", eventType: "festival", intents: ["festive"] },
            { date: "2026-01-24", name: "Candlelight Tribute to A.R. Rahman", description: "Soulful, cinematic night plans", eventType: "concert", intents: ["casual", "date"] },
            { date: "2026-01-26", name: "Republic Day", description: "Patriotic events, parades", eventType: "festival", intents: ["festive", "patriotic"] },
            { date: "2026-01-29", name: "BIFFes Begins", description: "Indie cinema, global films, cinephile culture", eventType: "social", intents: ["casual"] },

            // FEBRUARY
            { date: "2026-02-01", name: "Hanumankind Live", description: "Late-night energy, local gig culture", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-02-07", name: "🌹 Rose Day", description: "Give roses to express love, friendship, admiration", eventType: "social", intents: ["gifting", "date"] },
            { date: "2026-02-07", name: "ICC Cricket T20 WC Begins", description: "Cricket world cup fever", eventType: "social", intents: ["casual", "sports"] },
            { date: "2026-02-08", name: "💍 Propose Day", description: "A day to confess feelings or pop the question", eventType: "social", intents: ["date"] },
            { date: "2026-02-08", name: "DJ Snake Concert", description: "EDM dance party energy", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-02-09", name: "🍫 Chocolate Day", description: "Share chocolates with that special someone", eventType: "social", intents: ["gifting", "date"] },
            { date: "2026-02-09", name: "AITA Talent Series Begins", description: "Youth sports tournament", eventType: "social", intents: ["casual", "sports"] },
            { date: "2026-02-10", name: "🧸 Teddy Day", description: "Gift a cute teddy to show warmth and care", eventType: "social", intents: ["gifting", "date"] },
            { date: "2026-02-11", name: "🤝 Promise Day", description: "Make meaningful promises to strengthen bonds", eventType: "social", intents: ["date"] },
            { date: "2026-02-12", name: "🤗 Hug Day", description: "Celebrate closeness with a warm hug", eventType: "social", intents: ["date"] },
            { date: "2026-02-13", name: "💋 Kiss Day", description: "Share a kiss to express affection and intimacy", eventType: "social", intents: ["date"] },
            { date: "2026-02-14", name: "Valentine’s Day", description: "Date nights, intimate candlelight concerts", eventType: "social", intents: ["party", "date", "gifting"] },
            { date: "2026-02-15", name: "Maha Shivaratri", description: "Deep-night vigils, spiritual nights", eventType: "festival", intents: ["festive", "spiritual"] },
            { date: "2026-02-15", name: "Cry-It-Out Day", description: "Emotional release day for Gen Z", eventType: "social", intents: ["casual"] },
            { date: "2026-02-17", name: "Bangalore AI Forum", description: "Tech conference / networking", eventType: "social", intents: ["casual", "professional"] },
            { date: "2026-02-22", name: "Anuv Jain Concert", description: "Dastakhat India Tour", eventType: "concert", intents: ["casual", "date"] },
            { date: "2026-02-26", name: "INDIAWOOD 2026 Begins", description: "Major industry expo", eventType: "social", intents: ["casual"] },

            // MARCH
            { date: "2026-03-01", name: "That Girl Reset Day", description: "Self-care and productivity reset", eventType: "social", intents: ["casual"] },
            { date: "2026-03-04", name: "Holi", description: "Festival of colors and joy", eventType: "festival", intents: ["party", "festive", "casual"] },
            { date: "2026-03-04", name: "Joel Veena Live", description: "Indian classical fusion at BIC", eventType: "concert", intents: ["casual"] },
            { date: "2026-03-06", name: "Harry Styles Album Release", description: "Album drop party vibe", eventType: "pop-culture", intents: ["party", "casual"] },
            { date: "2026-03-08", name: "ICC Cricket T20 WC Final", description: "Major cricket final energy", eventType: "social", intents: ["casual", "sports"] },
            { date: "2026-03-12", name: "AI DevCon 2026", description: "NIMHANS tech summit", eventType: "social", intents: ["casual", "professional"] },
            { date: "2026-03-13", name: "TTF Bengaluru Expo Begins", description: "3-day travel fair", eventType: "social", intents: ["casual"] },
            { date: "2026-03-14", name: "Sanam Live", description: "Bollywood pop concert", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-03-14", name: "Osho Jain Live", description: "Indie singer-songwriter night", eventType: "concert", intents: ["casual", "date"] },
            { date: "2026-03-18", name: "Dhurandhar Part 2 Release", description: "Movie release day", eventType: "movie", intents: ["casual"] },
            { date: "2026-03-19", name: "Navratri Begins (Day 1)", description: "Festive dance and music begins", eventType: "festival", intents: ["party", "festive"] },
            { date: "2026-03-20", name: "Navratri Day 2", description: "Festive celebrations", eventType: "festival", intents: ["festive"] },
            { date: "2026-03-20", name: "BTS Arirang Release", description: "K-pop album drop celebration", eventType: "pop-culture", intents: ["party", "casual"] },
            { date: "2026-03-21", name: "Navratri Day 3 / Eid-ul-Fitr", description: "Dual celebration day", eventType: "festival", intents: ["festive", "gifting"] },
            { date: "2026-03-22", name: "Navratri Day 4", description: "Festive celebrations", eventType: "festival", intents: ["festive"] },
            { date: "2026-03-23", name: "Navratri Day 5", description: "Festive celebrations", eventType: "festival", intents: ["festive"] },
            { date: "2026-03-24", name: "Navratri Day 6", description: "Festive celebrations", eventType: "festival", intents: ["festive"] },
            { date: "2026-03-25", name: "Navratri Day 7", description: "Festive celebrations", eventType: "festival", intents: ["festive"] },
            { date: "2026-03-26", name: "Navratri Day 8 / Ram Navami", description: "Festive and spiritual day", eventType: "festival", intents: ["festive", "spiritual"] },
            { date: "2026-03-26", name: "IPL 2026 Season Begins", description: "T20 cricket hype", eventType: "social", intents: ["casual", "sports"] },
            { date: "2026-03-27", name: "Navratri Final Day", description: "Conclusion of Navratri", eventType: "festival", intents: ["festive", "party"] },
            { date: "2026-03-28", name: "Sugaray Rayford Live", description: "Blues and soul music night", eventType: "concert", intents: ["casual"] },
            { date: "2026-03-29", name: "Karan Aujla Concert", description: "Punjabi music live", eventType: "concert", intents: ["party", "casual"] },
            { date: "2026-03-29", name: "Def Leppard Live", description: "International Rock Concert", eventType: "concert", intents: ["party", "casual"] },

            // OCTOBER
            { date: "2026-10-31", name: "Halloween", description: "Costume parties and nightlife", eventType: "pop-culture", intents: ["party", "casual"] },

            // DECEMBER
            { date: "2026-12-25", name: "Christmas", description: "Festive celebration and gifting", eventType: "festival", intents: ["festive", "gifting", "party"] },
            { date: "2026-12-31", name: "New Year’s Eve", description: "Year-end party energy", eventType: "social", intents: ["party", "casual"] },
        ];
        for (const e of bengaluruEvents2026) {
            await storage.createEvent({
                ...e,
                audience: "Gen Z",
                vibe: [],
                fashionKeywords: { colors: [], styles: [], materials: [], designs: [], mood: [] }
            });
        }
        console.log("Seeding complete.");
    } else {
        console.log("Database already seeded.");
    }
}

seedDatabase().catch(console.error);
