// src/components/pages/homes/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const mobileMenuVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center gap-3">
            <Link href="/">
              <img
                src="/images/gouni_logo.svg"
                alt="GO University Seal"
                className="h-12 w-12 object-contain rounded-full cursor-pointer"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Features", "FAQs"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-900 dark:bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/register" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium shadow-sm cursor-pointer transition-colors">
                Get Started
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button & Theme Toggle (Mobile) */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-background border-t border-border overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground font-medium">
                Home
              </Link>
              <Link
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground font-medium">
                About
              </Link>
              <Link
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground font-medium">
                Features
              </Link>
              <Link
                href="#faqs"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground font-medium">
                FAQs
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-blue-900 dark:text-blue-400 font-bold">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
