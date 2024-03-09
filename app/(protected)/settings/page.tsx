"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
const SettingsPage = () => {
  const session = useSession();
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return <div>settings page</div>;
};

export default SettingsPage;
