"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  const items = useSelector(state => state.cart.items)

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

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProvider();
  }, []);

  const toggleHandler = () => {
    setToggle(false);
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
        session={session}
        signIn={signIn}
        signOut={signOut}
        toggleHandler={toggleHandler}
        setToggle={setToggle}
        providers={providers}
        toggle={toggle}
        items={items}
      />

      {/* <-- Desktop Navigation --> */}
      <DesktopNav
        session={session}
        signIn={signIn}
        signOut={signOut}
        providers={providers}
        pathname={pathname}
        items={items}
      />
    </nav>
  );
}
