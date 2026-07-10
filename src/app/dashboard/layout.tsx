"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  Target,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  
  const [collapsed, setCollapsed] =
    useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Assessments",
      href: "/dashboard/assessments",
      icon: ClipboardList,
    },
    {
      label: "Career Explorer",
      href: "/dashboard/career-explorer",
      icon: Target,
    },
    {
      label: "Career Journey",
      href: "/dashboard/career-journey",
      icon: Target
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white">

      {/* MOBILE HEADER */}

      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-zinc-200 px-5 py-4 flex items-center justify-between">

        <div>

          <Image
            src="/logo.png"
            alt="CareerAI"
            width={140}
            height={40}
            priority
          />

        </div>

        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          className="p-2 rounded-lg border border-zinc-300"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-zinc-600" />
          ) : (
            <Menu className="w-6 h-6 text-zinc-600" />
          )}
        </button>

      </div>

      {/* MOBILE SIDEBAR */}

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40">

          <aside className="absolute left-0 top-0 h-full w-72 bg-white px-8 py-10">

            <div>

              <div className="flex items-center gap-3">

                <Image
                  src="/logo.png"
                  alt="CareerAI"
                  width={140}
                  height={40}
                />

              </div>

              <p className="text-zinc-500 mt-2">
                AI Career Platform
              </p>

            </div>

            <div className="mt-14 space-y-3">

              {navItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    pathname ===
                    item.href;

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                        active
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />

                      {
                        item.label
                      }

                    </Link>
                  );
                }
              )}

            </div>

          </aside>

        </div>
      )}

      <div className="flex">

        {/* DESKTOP SIDEBAR */}

        <aside
          className={`
            hidden md:flex flex-col
            transition-all duration-300
            ${
              collapsed
                ? "w-20"
                : "w-72"
            }
            min-h-screen
            bg-white
            border-r
            border-zinc-200
            px-4
            py-8
          `}
        >
          
          <div>

            <div className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="CareerAI"
              width={180}
              height={60}
            />

          </div>

            <p className="text-zinc-500 mt-2">
              AI Career Platform
            </p>

          </div>

          {/* <button
            onClick={() =>
              setCollapsed(
                !collapsed
              )
            }
            className="
              absolute
              -right-3
              top-10
              bg-white
              border
              border-zinc-200
              rounded-full
              p-2
              shadow-md
            "
          >
            {collapsed ? "→" : "←"}
          </button> */}

          <div className="mt-14 space-y-3">

            {navItems.map(
              (item) => {
                const Icon =
                  item.icon;

                const active =
                  pathname ===
                  item.href;

                return (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                      active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />

                    {item.label}

                  </Link>
                );
              }
            )}

          </div>

        </aside>

        {/* PAGE CONTENT */}

        <main className="flex-1">

          {children}

        </main>

      </div>

    </div>
  );
}