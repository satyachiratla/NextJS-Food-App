"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function DesktopNav({
  session,
  pathname,
  signOut,
  items,
  userData,
}) {
  const controls = useAnimation();

  const linksVariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5, type: "tween" },
    },
  };

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    });
  }, [items]);

  return (
    <div className="hidden md:flex md:pr-6">
      {session ? (
        <motion.div
          variants={linksVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center gap-8"
        >
          <Link
            href="/cart"
            className={`${pathname === "/cart" ? "nav-active" : ""} nav`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart{" "}
            <motion.span
              animate={controls}
              className="bg-amber-600 text-white rounded-full px-1.5"
            >
              {items.length}
            </motion.span>
          </Link>
          <Link
            href="/orders"
            className={`${pathname === "/orders" ? "nav-active" : ""} nav`}
          >
            Orders
          </Link>
          <div className="dropdown dropdown-hover dropdown-bottom p-0">
            <div tabIndex={0} role="button">
              {userData?.user?.profilePic ? (
                <Image
                  src={userData?.user?.profilePic}
                  alt="Profile picture"
                  width={18}
                  height={18}
                  className="rounded-full object-cover w-9 h-9"
                />
              ) : (
                <FaUserCircle size={36} />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content absolute right-0 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/addresses">Addresses</Link>
              </li>
              <li>
                <button type="button" onClick={signOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn btn-neutral btn-sm"
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
}
