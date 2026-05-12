"use client";
import { ThreeBackground } from "./ThreeBackground";
import { Heart } from "lucide-react";
import React from "react";
import { author } from "@/constants/footer";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export function Footer() {
  return (
    <footer className="relative bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ThreeBackground />
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          {/* Left section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              {author.name}
            </h3>
            <p className="text-gray-400">{author.role}</p>
          </div>

          {/* Right section */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by{" "}
              {author.name}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
