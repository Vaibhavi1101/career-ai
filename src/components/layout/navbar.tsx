"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="CareerAI Logo"
            width={170}
            height={60}
            className="object-contain"
            />

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12 text-lg font-medium">

          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/explore" className="hover:text-blue-600 transition">
            Explore Tests
          </Link>

          <Link href="/about" className="hover:text-blue-600 transition">
            About Us
          </Link>

        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-4">

          <button className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition">
            ☀️
          </button>

          <button className="px-6 py-2 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition">
            Login
          </button>

          <button className="px-6 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition">
            Signup
          </button>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >

          {open ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="md:hidden border-t border-zinc-200 bg-white px-6 py-6 space-y-6">

          <Link
            href="/"
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/explore"
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            Explore Tests
          </Link>

          <Link
            href="/about"
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>

          <div className="flex flex-col gap-4 pt-4">

            <button className="w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold">
              Login
            </button>

            <button className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold">
              Signup
            </button>

          </div>

        </div>

      )}

    </header>
  );
}