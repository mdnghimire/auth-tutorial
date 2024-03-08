import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
const SettingsPage = async () => {
  const session = await auth();

  // const existingUser = await db.user.findUnique({
  //   where: {
  //     id: session?.user.id,
  //   },
  // });

  // if (existingUser) {
  //   await db.user.update({
  //     data: {
  //       emailVerified: true,
  //     },
  //   });
  // }

  return (
    <div className="ml-5">
      Settings page
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button className="ml-2" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
