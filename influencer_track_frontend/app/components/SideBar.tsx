"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen min-w-[18%] border-r border-gray-300 bg-white p-6">
      <h1 className="text-xl mb-6 text-gray-700 font-bold">Campaigns</h1>

      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard">
          <div
            className={`p-3 rounded-lg cursor-pointer text-gray-700 transition-all duration-300 ease-in-out ${
              pathname === "/dashboard" ? "font-bold" : ""
            } lg:hover:translate-x-2`}
          >
            📊 Campaign Dashboard
          </div>
        </Link>

        <Link href="/dashboard/my-campaigns">
          <div
            className={`p-3 rounded-lg cursor-pointer text-gray-700 transition-all duration-300 ease-in-out ${
              pathname === "/dashboard/my-campaigns" ? "font-bold" : ""
            } lg:hover:translate-x-2`}
          >
            📁 My Campaigns
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
