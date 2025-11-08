import { Spinner } from "@/components/ui/spinner";
import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner */}
                <Spinner className="size-6 text-accent-foreground" />

                {/* Text */}
                {/* <p className="text-xs font-medium text-foreground/80">
                    ...
                </p> */}
            </div>
        </div>
    );
};

export default Loader;
