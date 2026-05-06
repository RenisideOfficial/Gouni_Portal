// src/components/pages/homes/Hero.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="relative w-full bg-background pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show">
          {/* Subheading */}
          <motion.div
            variants={itemVariants}
            className="flex md:flex-row flex-col gap-2 items-center space-x-2 mb-6">
            <span className="text-blue-900 dark:text-blue-400">
              <AiFillStar />
            </span>
            <p className="text-sm md:text-base font-medium text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              One Portal. Every Student Service.
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your University, <br className="md:hidden" />
            <span className="relative inline-block px-4">
              Simplified.
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                className="absolute -inset-x-1 -inset-y-2 w-full h-full text-blue-800 dark:text-blue-500"
                viewBox="0 0 250 100"
                fill="none"
                preserveAspectRatio="none">
                <ellipse
                  cx="125"
                  cy="50"
                  rx="120"
                  ry="45"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Access your academic records, payments, results, and campus services
            — all in one secure platform.
          </motion.p>

          {/* CTA Buttons - Responsive */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Link href="/login" passHref className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 bg-blue-900 dark:bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-lg cursor-pointer text-center">
                Login
              </motion.div>
            </Link>
            <Link href="/register" passHref className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 border-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer text-center">
                Register As Student
              </motion.div>
            </Link>
          </motion.div>

          {/* Background Illustration */}
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-border">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="aspect-video bg-muted relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <img
                src="/images/hero_image.jpg"
                alt="Gouni Students"
                className="w-full h-full object-cover relative z-0"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
