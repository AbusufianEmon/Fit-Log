"use client";
import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { planItems, savedItems } = usePlan();
  const pathname = usePathname();

  return (
    <nav className="shadow-sm border-b border-gray-700 bg-base-300 sticky top-0 z-50">
      <div className="navbar container mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  href="/"
                  className={
                    pathname === "/" ? "text-lime-400 font-semibold" : ""
                  }
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link
                  href={"/my-plan"}
                  className={
                    pathname === "/my-plan" ? "text-lime-400 font-semibold" : ""
                  }
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="flex gap-2 items-center">
            <Dumbbell className="text-lime-400" />
            <h2>FitLog</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/" ? "text-lime-400 font-semibold" : ""
                }
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href={"/my-plan"}
                className={
                  pathname === "/my-plan" ? "text-lime-400 font-semibold" : ""
                }
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <Link
            href={"/my-plan"}
            className="flex items-center px-2 py-1 rounded-2xl gap-2 hover:cursor-pointer hover:bg-base-100"
          >
            Plan
            <span className="badge bg-lime-400 text-gray-900 border-none rounded-2xl">
              {planItems.length}
            </span>
          </Link>
          <Link
            href={"/my-plan"}
            className="flex items-center px-2 py-1 rounded-2xl gap-2 hover:cursor-pointer hover:bg-base-100"
          >
            Saved
            <span className="badge badge-outline border-white text-white rounded-2xl">
              {savedItems.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
