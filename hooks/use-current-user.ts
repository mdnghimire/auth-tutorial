import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  console.log("check session data here", session);
  return session.data?.user;
};
