import SidebarLayout from "@/components/sidebar-layout";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
  children: React.ReactNode;

}


 async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const collapsed = cookieStore.get("pl:sidebar:collapsed")?.value === "1";
  return (
    <SidebarLayout initialCollapsed={collapsed}>
      {children}
    </SidebarLayout>
  );
}

export default DashboardLayout;