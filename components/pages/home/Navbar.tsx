// src/components/pages/homes/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img
              src="/images/gouni_logo.svg"
              alt="GO University Seal"
              className="h-12 w-12 object-contain rounded-full"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-blue-900 font-medium transition-colors">
              Home
            </Link>
            <Link
              href="#about"
              className="text-slate-600 hover:text-blue-900 font-medium transition-colors">
              About
            </Link>
            <Link
              href="#features"
              className="text-slate-600 hover:text-blue-900 font-medium transition-colors">
              Features
            </Link>
            <Link
              href="#faqs"
              className="text-slate-600 hover:text-blue-900 font-medium transition-colors">
              FAQs
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/auth/login"
              className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-800 transition-colors shadow-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none">
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
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-slate-600 font-medium">
              Home
            </Link>
            <Link
              href="#about"
              className="block px-3 py-2 text-slate-600 font-medium">
              About
            </Link>
            <Link
              href="#features"
              className="block px-3 py-2 text-slate-600 font-medium">
              Features
            </Link>
            <Link
              href="#faqs"
              className="block px-3 py-2 text-slate-600 font-medium">
              FAQs
            </Link>
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-blue-900 font-bold">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
