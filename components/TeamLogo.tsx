"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function TeamLogo({
  team,
}: {
  team: {
    name: string
    logo: React.ElementType
    plan?: string
  }
}) {
  const { logo: Logo, name, plan } = team

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent focus-visible:ring-0 px-4 mb-2"
        >
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Logo className="size-4" />
            </div>

            {/* App/Team name */}
            <div className="flex flex-col text-left">
              <span className="font-semibold text-lg text-foreground leading-tight uppercase">
                {name}
              </span>
              {plan && (
                <span className="text-xs text-muted-foreground leading-tight text-center uppercase">
                  {plan}
                </span>
              )}
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
