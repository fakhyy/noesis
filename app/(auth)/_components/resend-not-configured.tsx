"use client";

import { Button } from "@/components/ui/button";
import { CircleExclamationPoint } from "lucide-react";
import { useRouter } from "next/navigation";

export function ResendNotConfigured() {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="px-4 py-10 border border-warning/32 rounded-xl bg-warning/5 flex flex-col items-center justify-center gap-4">
        <div className="p-2 bg-warning/32 rounded-full w-fit">
          <CircleExclamationPoint />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <h3 className="text-lg font-medium">Configuration Error</h3>
          <p className="text-muted-foreground text-sm">
            Password recovery is currently unavailable. <br /> The{" "}
            <code className="font-mono font-bold">RESEND_API_KEY</code>{" "}
            environment variable is not configured.
          </p>
        </div>
        <Button onClick={() => router.push("/login")} className="px-6">
          Login Instead
        </Button>
      </div>
    </div>
  );
}
