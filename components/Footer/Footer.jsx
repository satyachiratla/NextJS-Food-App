"use client";

import { BiLogoGmail, BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <section>
      <div className="flex flex-row items-center justify-center px-8 py-4">
        <motion.div whileHover={{ scale: 1.1 }} className="mx-3">
          <a href="mailto:satyachiratla77@gmail.com" title="gmail">
            <BiLogoGmail className="w-8 h-8 text-gray-200" />
          </a>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="mx-3">
          <a href="https://github.com/satyachiratla" title="github profile">
            <BiLogoGithub className="w-8 h-8 text-gray-200" />
          </a>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="mx-3">
          <a
            href="https://www.linkedin.com/in/satya-chiratla-378b31165/"
            title="linkedin profile"
          >
            <BiLogoLinkedin className="w-8 h-8 text-gray-200" />
          </a>
        </motion.div>
      </div>
      <div className="text-center mb-8">
        <p className="text-lg tracking-wide font-lunasima text-white">
          {" "}
          Made with ❤️ by Vivek
        </p>
        <p className="text-zinc-200"> © {new Date().getFullYear()} Reserved</p>
      </div>
    </section>
  );
}
