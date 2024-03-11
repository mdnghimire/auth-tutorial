import { Poppins } from "next/font/google";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800">
      <div className="space-y-6 text-center  text-white border-2 border-white rounded-lg shadow-lg p-10">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth.js
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <LoginButton mode="modal" asChild>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
