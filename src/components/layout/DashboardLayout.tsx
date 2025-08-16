import { ReactNode } from "react";
import BottomNavigation, { UserRole } from "./BottomNavigation";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default DashboardLayout;