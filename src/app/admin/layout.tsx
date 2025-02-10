import { ReactNode } from "react";
import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This Is admin dashboard",
};

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div
        className="overflow-height w-16 lg:w-1/5 bg-purple-600
        text-white p-1 lg:p-5"
      >
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
