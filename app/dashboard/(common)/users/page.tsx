import { db } from "@/lib/db";

const UsersPage = async () => {
  const users = await db.user.findMany({
    include: {
      accounts: true,
    },
  });

  return (
    <div>
      <h1 className="font-black">Users</h1>
      <pre> {JSON.stringify(users, null, 2)} </pre>
    </div>
  );
};

export default UsersPage;
