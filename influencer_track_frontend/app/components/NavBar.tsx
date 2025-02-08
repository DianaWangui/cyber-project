"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-[70px] sticky top-0 z-50 shadow flex items-center px-6 md:px-12 gap-16 pl-16">

      <Link href="/dashboard">
        <span className="text-xl font-bold cursor-pointer text-gray-800">
          TrendAI
        </span>
      </Link>
      <Link href="/dashboard">
        <span className="text-lg font-semibold cursor-pointer hover:underline text-gray-800">
          Dashboard
        </span>
      </Link>
    </div>
  );
};

export default NavBar;
