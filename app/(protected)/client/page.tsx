"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  // console.log("check user here", user);

  return <UserInfo label="📱 Client component" user={user} />;
};

export default ClientPage;
