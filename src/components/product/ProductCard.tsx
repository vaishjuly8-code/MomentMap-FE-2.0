"use client";

import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    return (
        <Card className={cn(
            "group overflow-hidden border-none bg-white shadow-ambient hover:shadow-raised hover:scale-[1.02] transition-all duration-700 rounded-[2.5rem]",
            className
        )}>
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-low relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                    {product.season?.map((s) => (
                        <Badge key={s} className="capitalize text-[9px] font-bold tracking-[0.2em] bg-white/90 backdrop-blur-xl text-foreground border-none px-4 py-1.5 rounded-full shadow-sm">
                            {s}
                        </Badge>
                    ))}
                </div>
            </div>
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-body font-bold text-sm tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="font-display font-bold text-xl text-primary tracking-tighter">
                        ${(product.price / 100).toFixed(0)}
                    </span>
                </div>
                <p className="text-[10px] font-body uppercase tracking-[0.3em] text-muted-foreground/40 mb-6 font-bold">{product.category}</p>
                <div className="flex flex-wrap gap-2">
                    {product.occasion?.slice(0, 2).map((occ) => (
                        <Badge key={occ} className="text-[9px] uppercase tracking-[0.15em] font-normal border-none bg-surface-container-low text-muted-foreground px-3 py-1 rounded-full">
                            {occ}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
