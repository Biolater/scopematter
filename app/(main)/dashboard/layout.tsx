import { SidebarLayout } from "@/components/sidebar-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;

}


 function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
}

export default DashboardLayout;