"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useUser from "@hooks/useUser";
import { logout } from "@redux-store/slices/authSlice";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, userData, refetch } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);

  const navVariants = {
    hidden: {
      x: "-100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3, type: "tween" },
    },
  };

  const toggleHandler = () => {
    setToggle(false);
  };

  const signOutHandler = () => {
    dispatch(logout());
    refetch();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur flex justify-between items-center py-6 px-6 mx-auto border-b border-gray-300/75">
      <motion.div variants={navVariants} initial="hidden" animate="visible">
        <Link
          href="/"
          className="flex justify-center items-center gap-3 md:gap-4"
        >
          <Image
            src="/assets/images/logo.jpeg"
            alt="logo"
            width={37}
            height={37}
            className="rounded-full border border-gray-200"
          />
          <p className="text-xl orange_gradient font-satoshi font-bold tracking-wider md:text-2xl">
            Peddada Meals
          </p>
        </Link>
      </motion.div>

      {/* <-- Mobile Navigation --> */}
      <MobileNav
        signOut={signOutHandler}
        session={isAuthenticated}
        toggleHandler={toggleHandler}
        setToggle={setToggle}
        toggle={toggle}
        items={items}
        userData={userData}
      />

      {/* <-- Desktop Navigation --> */}
      <DesktopNav
        session={isAuthenticated}
        signOut={signOutHandler}
        pathname={pathname}
        items={items}
        userData={userData}
      />
    </nav>
  );
}
