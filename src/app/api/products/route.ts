import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let products = await storage.getProducts();

    if (category && category !== "All") {
        products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
        const s = search.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(s) ||
            p.description?.toLowerCase().includes(s)
        );
    }

    return NextResponse.json(products);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = insertProductSchema.parse(body);
        const product = await storage.createProduct(validated);
        return NextResponse.json(product, { status: 201 });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ message: err.issues[0].message }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name");
        const styleCode = searchParams.get("styleCode");

        if (!name && !styleCode) {
            return NextResponse.json({ message: "Name or styleCode is required for deletion" }, { status: 400 });
        }

        if (name) {
            await storage.deleteProductByName(name);
        } else if (styleCode) {
            await storage.deleteProductByStyleCode(styleCode);
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error("Deletion error:", err);
        return NextResponse.json({ message: "Internal Server Error during deletion" }, { status: 500 });
    }
}
