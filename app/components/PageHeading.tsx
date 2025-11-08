"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeadingProps {
    title: string;
    subtitle?: string;
}

export function PageHeading({ title, subtitle }: PageHeadingProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between mb-6  pb-2">
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Go back</span>
                </Button>

                <div>
                    <h1 className="text-sm font-semibold tracking-wide">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
