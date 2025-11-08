import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PermissionInitializer from "../components/auth/PermissionInitializer";
import Loader from "../components/Loader";
import ProfileIcon from "../components/profile/ProfileIcon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>

          <PermissionInitializer />

          {/* This part only shows once PermissionInitializer finishes */}
          <header className="shadow flex h-16 shrink-0 items-center gap-2 justify-between">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="lg:mr-10">
              <ProfileIcon isNav={true} />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-white">
            {children}
          </div>

        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
