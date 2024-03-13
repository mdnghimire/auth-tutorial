import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Header />
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default DashboardLayout;
