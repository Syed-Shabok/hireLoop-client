"use client";

import { useState } from "react";
import Link from "next/link";
// import BrandLogo from "./BrandLogo";
import { Bars, Xmark } from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      label: "Find Jobs",
      href: "/jobs",
    },
    {
      label: "Post a Job",
      href: "/post-job",
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex py-4 container items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <span className="text-xl font-bold text-white">P</span>
          </div>

          <div className="leading-none">
            <h2 className="text-xl font-bold">HireLoop</h2>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 transition-all duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <div className="h-6 w-px bg-white/10" />

          <Link
            href="/login"
            className="text-sm text-gray-300 transition-all duration-300 hover:text-white"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-violet-600 md:hidden"
        >
          {isOpen ? (
            <Xmark className="h-5 w-5 text-white" />
          ) : (
            <Bars className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
