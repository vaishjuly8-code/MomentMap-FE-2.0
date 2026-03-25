"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Collections", href: "/products" },
        { name: "Calendar", href: "/calendar" },
        { name: "Admin", href: "/admin" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#F8F7F4]/80 backdrop-blur-xl border-b border-black/5">
            <div className="container mx-auto px-8 h-20 flex items-center justify-between max-w-[1500px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
                    <span className="italic font-light text-primary">Moment</span>Map
                </Link>

                {/* Centered Links */}
                <div className="hidden md:flex items-center gap-10 font-body">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-[11px] font-bold tracking-[0.2em] uppercase transition-all pb-1 border-b-2",
                                pathname === item.href
                                    ? "text-primary border-primary"
                                    : "text-muted-foreground/60 border-transparent hover:text-primary"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions - Empty for now */}
                <div className="flex items-center gap-8">
                </div>
            </div>
        </nav>
    );
}
