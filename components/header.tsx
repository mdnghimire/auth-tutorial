"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExitIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const onClick = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center p-6 shadow-md">
      <Link href="#" passHref className="flex items-center">
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

      {/* Mobile toggle button */}
      <button
        className="lg:hidden text-2xl focus:outline-none"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <Input
          type="text"
          placeholder="Search..."
          className={`${
            isMobileMenuOpen ? "w-full" : "w-[450px]"
          } px-4 py-2 h-10 rounded-md shadow-md outline-none mb-2`}
        />
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Services</Button>
          <Button variant="ghost">Contact</Button>
          <Link href="/settings" className="font-bold no-underline">
            <Button variant="custom">Back to settings</Button>
          </Link>
        </nav>
        <Button variant="outline" onClick={onClick}>
          <ExitIcon className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Desktop search box container */}
      <div className="hidden lg:flex items-center w-[450px]">
        <Input
          type="search"
          placeholder="Search..."
          // className="px-4 py-2 w-full h-10 rounded-md shadow-md outline-none"
        />
        <Button variant="default" type="submit">
          <MagnifyingGlassIcon />
        </Button>
      </div>

      <nav className="hidden lg:flex space-x-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Services</Button>
        <Button variant="ghost">Contact</Button>
        <Link href="/settings" className="font-bold no-underline">
          <Button variant="custom">Back to settings</Button>
        </Link>

        <Button variant="outline" onClick={onClick}>
          <ExitIcon className="mr-2 h-4 w-4" /> Logout
        </Button>
      </nav>

      {/* Optional: You can add a close button for the mobile menu */}
      {isMobileMenuOpen && (
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          ✕
        </button>
      )}
    </header>
  );
};

export default Header;
