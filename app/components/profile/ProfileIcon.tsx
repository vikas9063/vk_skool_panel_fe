"use client"
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { GlobalAlert } from "../GlobalAlert"
import Cookies from "js-cookie";

const ProfileIcon = ({ isNav }: { isNav: boolean }) => {

    const { isMobile } = useSidebar();
    const [openAlert, setOpenAlert] = useState(false);
    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("username");
        window.location.href = "/login";
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={"user.avatar"} alt={"user.name"} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        {!isNav && <>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{"user.name"}</span>
                                <span className="truncate text-xs">{"user.email"}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </>}
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={isNav ? "top" : isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={"user.avatar"} alt={"user.name"} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{"user.name"}</span>
                                <span className="truncate text-xs">{"user.email"}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => setOpenAlert(true)}
                    >
                        <LogOut className="text-destructive" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Setting Logout Alert Box */}
            <GlobalAlert
                open={openAlert}
                onOpenChange={setOpenAlert}
                title="Are you sure you want to log out?"
                description="You will need to log in again to access your account."
                confirmText="Log Out"
                cancelText="Cancel"
                onConfirm={handleLogout}
            />

        </>
    )
}

export default ProfileIcon
