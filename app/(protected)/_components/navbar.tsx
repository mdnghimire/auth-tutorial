"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getInitials } from "@/utils/main";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  // console.log("check user", user?.role);

  return (
    <nav className=" bg-secondary flex justify-between items-center p-4 w-full shadow-sm fixed h-50 top-0 z-10">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        {user?.role === "ADMIN" && (
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        )}

        {user?.role === "ADMIN" && (
          <Button
            asChild
            variant={pathname === "/dashboard" ? "default" : "outline"}
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div className="font-bold">{getInitials(user?.name || "")}</div>
        <UserButton />
      </div>
    </nav>
  );
};
