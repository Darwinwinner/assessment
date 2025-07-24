"use client";

import { FileArchive, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils"; // Utility for conditional classNames

const items = [
  {
    title: "Articles",
    url: "/articles",
    icon: Newspaper,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        {/* Logo with text */}
        <div className="mb-6 px-4 flex items-center gap-2">
          <FileArchive className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-wide text-black">
            Articles.io
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon
                        className={cn(
                          "mr-2 h-4 w-4 transition-colors",
                          pathname === item.url ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-base transition-colors",
                          pathname === item.url
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
