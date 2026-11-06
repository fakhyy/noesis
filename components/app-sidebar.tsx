"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  SearchIcon,
  PlusIcon,
} from "lucide-react";
import { NoesisDark } from "./icons";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "M. Fakhar Sultan",
    email: "fakharsultan.dev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Beyond Imagination",
      url: "#",
    },
    {
      name: "Why Should You believe in God",
      url: "#",
    },
    {
      name: "Imagination is a greatest power",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
    >
      <header className="flex h-12 shrink-0 items-center justify-between border-b px-3">
        <NoesisDark width={20} height={20} />

        <div className="flex items-center gap-1">
          <Button size="icon-sm" variant="ghost" aria-label="Search notes">
            <SearchIcon />
          </Button>

          <Button size="icon-sm" variant="ghost" aria-label="New note">
            <PlusIcon />
          </Button>
        </div>
      </header>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
