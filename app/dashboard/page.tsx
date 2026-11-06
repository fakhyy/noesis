import { AppSidebar } from "@/components/app-sidebar";
import { UserNav } from "@/components/shared/user-nav";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

export default function Page() {
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
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
