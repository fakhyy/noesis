import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "21rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center justify-between border-b bg-accent/32 px-3">
          <SidebarTrigger />

          <div className="flex items-center gap-2">
            <Switch aria-label="Toggle setting" />
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
