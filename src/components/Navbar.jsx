"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bars, Xmark, Person } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("Current User:", user);

  const navLinks = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Post a Job", href: "/post-job" },
    { label: "Admin Dashboard", href: "/admin" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
    setDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex container items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <h2 className="text-xl font-bold leading-none">HireLoop</h2>
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

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm text-gray-300 transition-all duration-300 hover:text-white"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600">
                  <Person className="h-4 w-4 text-white" />
                </div>
                <span>Hi, {user.name?.split(" ")[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-44 rounded-2xl border border-white/10 bg-black/90 py-2 backdrop-blur-xl">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                  >
                    Profile
                  </Link>
                  <div className="my-1 h-px bg-white/10" />
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 transition-all hover:bg-white/5 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm text-gray-300 transition-all duration-300 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile: user avatar + menu button */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600">
              <Person className="h-4 w-4 text-white" />
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-violet-600"
          >
            {isOpen ? (
              <Xmark className="h-5 w-5 text-white" />
            ) : (
              <Bars className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
            {user && (
              <>
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600">
                    <Person className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-gray-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  Profile
                </Link>
                <div className="my-2 h-px bg-white/10" />
              </>
            )}

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

            {user ? (
              <button
                onClick={handleSignOut}
                className="rounded-xl px-4 py-3 text-left text-red-400 transition-all duration-300 hover:bg-white/5 hover:text-red-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
