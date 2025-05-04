"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDownIcon, UserCircle2Icon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);

  const navlinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full px-4 py-4 bg-stone-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold flex items-center">
            <img src="/img/logo.png" alt="logo" className="w-10 h-10 mr-2" />
            YEXIU CAFÉ
          </Link>

          {/* Navlinks */}
          <div className="hidden md:block w-1/3">
            <div className="flex justify-center gap-8">
              {navlinks.map((navlink) => (
                <Link
                  key={navlink.name}
                  href={navlink.href}
                  className={`text-lg hover:text-red-400 ${
                    pathname === navlink.href ? "text-red-600" : ""
                  }`}
                >
                  {navlink.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex divide-x divide-gray-200 items-center">
            <div className="px-2">
              <Link
                href="/cart"
                className="flex gap-2 items-center p-2 rounded-md bg-gray-200 hover:bg-gray-200/70"
              >
                <div className="relative">
                  <svg
                    viewBox="-0.5 -0.5 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={28}
                    width={28}
                  >
                    <path
                      d="M2.3713625 7.5181875c0.33573125000000004 -1.67863125 0.50359375 -2.5179625 1.0582624999999999 -3.05854375 0.1025125 -0.0999125 0.213425 -0.19083125 0.3315 -0.2717625C4.3999875 3.75 5.2559375 3.75 6.9678125 3.75h1.064375c1.711875 0 2.5678125 0 3.2066875 0.43788125 0.11806250000000001 0.08093125 0.229 0.17185 0.3315 0.2717625 0.5546875 0.54058125 0.7225625 1.3799125 1.0582500000000001 3.05854375 0.482 2.41 0.7230000000000001 3.6149999999999998 0.16825 4.468875 -0.1005 0.154625 -0.21775 0.29762500000000003 -0.349625 0.4264375C11.71875 13.125 10.489875 13.125 8.0321875 13.125h-1.064375c-2.4577125 0 -3.6865750000000004 0 -4.4150624999999994 -0.7115 -0.13190000000000002 -0.1288125 -0.24914999999999998 -0.2718125 -0.34959999999999997 -0.4264375 -0.5547875 -0.853875 -0.3137875 -2.058875 0.1682125 -4.468875Z"
                      stroke="#000000"
                      strokeWidth={1}
                    />
                    <path
                      fill="#000000"
                      d="M8.75 5.625a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0"
                      strokeWidth={1}
                    />
                    <path
                      fill="#000000"
                      d="M5 5.625a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0"
                      strokeWidth={1}
                    />
                    <path
                      d="M5.625 3.75V3.125c0 -1.03553125 0.8394375 -1.875 1.875 -1.875s1.875 0.83946875 1.875 1.875v0.625"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeWidth={1}
                    />
                  </svg>
                  <span className="absolute -top-[2px] -right-[2px] bg-red-400 text-[7pt] text-white w-3 h-3 flex items-center justify-center rounded-full">
                    0
                  </span>
                </div>
                <span className="hidden md:block text-black">Cart</span>
              </Link>
            </div>
            <div className="px-2 relative" ref={dropdownRef}>
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-2 rounded-md bg-gray-200 hover:bg-gray-200/70"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <UserCircle2Icon />
                    <span className="hidden text-md relative md:flex text-black items-end">
                      <p> {user.firstName}</p>
                      <ChevronDownIcon
                        size={10}
                        className="transform scale-x-[2] right-1/3 absolute top-5"
                      />
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 right-0 mt-2 bg-white shadow-lg rounded-md text-sm text-gray-700 divide-y divide-gray-200 w-[114px]">
                      <Link
                        href="/order-history"
                        className="block px-4 py-2 hover:bg-gray-100 "
                      >
                        Order history
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 p-2 rounded-md bg-gray-200 hover:bg-gray-200/70"
                >
                  <svg
                    viewBox="-0.5 -0.5 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height={28}
                    width={28}
                  >
                    <path
                      d="m1.2506125000000001 7.499375000000001 8.7500125 0m0 0 -2.1875 -1.8749875m2.1875 1.8749875 -2.1875 1.875"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                    />
                    <path
                      d="M5.6262187500000005 4.375c0.007568749999999999 -1.35939375 0.06785000000000001 -2.0955874999999997 0.5480875000000001 -2.575825C6.7235 1.25 7.607374999999999 1.25 9.375125 1.25l0.625 0c1.76775 0 2.6516875 0 3.2008124999999996 0.549175 0.5491875 0.549175 0.5491875 1.43305625 0.5491875 3.200825l0 5c0 1.76775 0 2.651625 -0.5491875 3.2008124999999996C12.651812499999998 13.75 11.767875 13.75 10.000125 13.75h-0.625c-1.76775 0 -2.651625 0 -3.2008187500000003 -0.5491875 -0.4802375 -0.48024999999999995 -0.5405187499999999 -1.2164375 -0.5480875000000001 -2.5758124999999996"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeWidth={1}
                    />
                  </svg>
                  <span className="hidden md:block text-black">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;