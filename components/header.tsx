"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function header() {
  const onClick = () => {
    logout();
  };
  return (
    <header className="flex justify-between items-center p-6 shadow-md">
      <Link className="flex items-center" href="#">
        <Image
          alt="Logo"
          className="rounded-full"
          height="50"
          src="/logo.jpg"
          style={{
            aspectRatio: "50/50",
            objectFit: "cover",
          }}
          width="50"
        />
        <span className="ml-2 text-xl font-semibold">Logo</span>
      </Link>
      <nav className="space-x-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">Contact</Button>
        <Link href="/settings" className="font-bold no-underline">
          <Button variant="custom">back to settings</Button>
        </Link>
      </nav>
      <Button variant="outline" onClick={onClick}>
        <ExitIcon className="mr-2 h-4 w-4" /> Logout
      </Button>
    </header>
  );
}
