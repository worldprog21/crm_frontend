"use client";

import {
  IconAddressBook,
  IconBriefcase,
  IconInnerShadowTop,
  IconLayoutDashboard,
  IconListDetails,
  IconUserCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: IconListDetails,
    },
    {
      title: "Customers",
      url: "#",
      icon: IconUserCheck,
    },
    {
      title: "Contacts",
      url: "#",
      icon: IconAddressBook,
    },
    {
      title: "Activities",
      url: "#",
      icon: IconUsersGroup,
    },
    {
      title: "Opportunities",
      url: "#",
      icon: IconBriefcase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="font-semibold text-base">ClientFlow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user?.email && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
