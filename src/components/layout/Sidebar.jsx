"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar1Icon,
  NotepadTextIcon,
  LogOutIcon,
  UserCircle2,
  CoffeeIcon,
  ChartColumnIcon,
  LogsIcon,
  Users2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const employeeNavigationItems = [

    {
      name: "Profile infomation",
      href: "/employee/profile",
      icon: <UserCircle2 />,
    },
    {
      name: "Work schedule",
      href: "/employee/work-schedule",
      icon: <Calendar1Icon />,
    },
    {
      name: "Leave requests",
      href: "/employee/leave-requests",
      icon: <NotepadTextIcon />,
    },
  ];

  const adminNavigationItems = [

    {
      name: "Manage drinks",
      href: "/admin/manage-drinks",
      icon: <CoffeeIcon />,
    },
    {
      name: "Manage employees",
      href: "/admin/manage-employees",
      icon: <Users2 />,
    },
    {
      name: "Manage orders",
      href: "/admin/manage-orders",
      icon: <LogsIcon />,
    },
    {
      name: "Sale statistics",
      href: "/admin/sale-statistics",
      icon: <ChartColumnIcon />,
    },

    {
      name: "Manage leaves",
      href: "/admin/manage-leaves",
      icon: <NotepadTextIcon />,
    },

    {
      name: "Work schedule",
      href: "/admin/work-schedule",
      icon: <Calendar1Icon />,
    },
  ];

  const navigationItems =
    user?.role === "ADMIN" ? adminNavigationItems : employeeNavigationItems;

  return (
    <div className="h-screen w-full bg-[#0A1629] p-4 flex flex-col justify-between">
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 mb-4 bg-transparent mr-4">
          <img src="/img/logo.png" alt="logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-semibold text-white">Yexiu Cafe</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {}
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex gap-2 items-center px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? "bg-slate-700 text-white "
                    : "text-gray-400 hover:bg-[#1E293B] hover:text-gray-200"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="flex items-center gap-2 px-4 py-3 mt-6 text-gray-400 transition-all bg-transparent hover:bg-[#1E293B] hover:text-gray-200 rounded-md"
      >
        <LogOutIcon />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;