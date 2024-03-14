import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Header />
      <div className="fixed inset-y-0  left-0 w-64 bg-gray-200 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 mt-[100px] overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
