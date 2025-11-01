"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { configurations } from "@/lib/configurations"

/* -----------------------------------
   🔹 Shared Menu Data
----------------------------------- */
type MenuLink = {
  title: string
  href: string
  description?: string
  icon?: React.ReactNode
}

type MenuSection = {
  id: string
  title: string
  description?: string
  links: MenuLink[]
}

const menuData: MenuSection[] = [
  {
    id: "home",
    title: "Home",
    description:
      "Beautifully designed components built with Tailwind CSS.",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Typography", href: "/docs/primitives/typography" },
    ],
  },
  {
    id: "components",
    title: "Components",
    links: [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task.",
      },
      {
        title: "Scroll Area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content displayed one at a time.",
      },
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "Displays information related to an element when hovered or focused.",
      },
    ],
  },
  {
    id: "icons",
    title: "With Icon",
    links: [
      { title: "Backlog", href: "#", icon: <CircleHelpIcon size={16} /> },
      { title: "To Do", href: "#", icon: <CircleIcon size={16} /> },
      { title: "Done", href: "#", icon: <CircleCheckIcon size={16} /> },
    ],
  },
]

/* -----------------------------------
   🔸 Component
----------------------------------- */
function Appbar() {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Company Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80">
          {configurations.siteName}
        </Link>

        {/* --------------------
            Desktop Menu
        -------------------- */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
              {menuData.map((section) => (
                <NavigationMenuItem key={section.id}>
                  <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
                      {section.links.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <Button asChild variant="default">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* --------------------
            Mobile Menu Button
        -------------------- */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpenMobile(!openMobile)}
        >
          {openMobile ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* --------------------
          Mobile Menu
      -------------------- */}
      {openMobile && (
        <div className="md:hidden border-t bg-background shadow-inner max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-4">
            {menuData.map((section) => (
              <AccordionSection
                key={section.id}
                title={section.title}
                expanded={expanded === section.id}
                onToggle={() => toggleExpand(section.id)}
              >
                {section.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center gap-2 text-sm hover:underline"
                  >
                    {link.icon && link.icon}
                    {link.title}
                  </Link>
                ))}
              </AccordionSection>
            ))}

            <div className="pt-2 border-t">
              <Link href="/docs" className="block text-sm hover:underline">
                Docs
              </Link>
              <Button asChild className="w-full mt-3">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

/* -----------------------------------
   🔸 Accordion Section for Mobile
----------------------------------- */
function AccordionSection({
  title,
  children,
  expanded,
  onToggle,
}: {
  title: string
  children: React.ReactNode
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="border rounded-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-3 font-semibold hover:bg-muted/50"
      >
        {title}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            expanded ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      {expanded && <div className="pl-4 pb-3 pr-2 space-y-2">{children}</div>}
    </div>
  )
}

/* -----------------------------------
   🔸 Desktop List Item
----------------------------------- */
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Appbar
