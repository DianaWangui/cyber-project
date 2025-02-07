"use client"; // Ensure this runs only on the client side

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname(); // Use next/navigation instead of next/router

  return (
    <div className="h-screen w-[18%] border-r border-gray-300 bg-white p-6">
      <h1 className="text-xl mb-6 text-gray-700 font-bold">Campaigns</h1>

      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard">
          <div
            className={`p-3 rounded-lg cursor-pointer text-gray-700 transition-all duration-300 ease-in-out transform ${
              pathname === "/dashboard" ? "font-bold" : "ml-0"
            } hover:ml-2`}
          >
            📊 Campaign Dashboard
          </div>
        </Link>

        <Link href="/my-campaigns">
          <div
            className={`p-3 rounded-lg cursor-pointer text-gray-700 transition-all duration-300 ease-in-out transform ${
              pathname === "/my-campaigns" ? "font-bold" : "ml-0"
            } hover:ml-2`}
          >
            📁 My Campaigns
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
