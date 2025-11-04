import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ProfileIcon from "@/app/components/profile/ProfileIcon"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ProfileIcon isNav={false} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
