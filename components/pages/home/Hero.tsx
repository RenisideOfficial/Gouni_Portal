// src/components/pages/homes/Hero.tsx
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Subheading with Sparkle Icon Placeholder */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-blue-900">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
              </svg>
            </span>
            <p className="text-sm md:text-base font-medium text-blue-900 tracking-wide uppercase">
              One Portal. Every Student Service.
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your University, <br className="md:hidden" />
            <span className="relative inline-block px-4">
              Simplified.
              {/* The Blue Oval SVG from the Figma Design */}
              <svg
                className="absolute -inset-x-1 -inset-y-2 w-full h-full text-blue-800"
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
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-slate-600 text-lg md:text-xl mb-10 leading-relaxed">
            Access your academic records, payments, results, and campus services
            — all in one secure platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto px-10 py-4 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-lg">
              Login
            </Link>
            <Link
              href="/auth/activate"
              className="w-full sm:w-auto px-10 py-4 border-2 border-blue-900 text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-colors">
              Activate Account
            </Link>
          </div>

          {/* Background Illustration / Image Placeholder */}
          <div className="mt-16 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <div className="aspect-video bg-slate-100 relative group">
              {/* Replace with Gouni Campus/Graduation Image as per Figma */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <img
                src="/images/hero_image.jpg"
                alt="Gouni Students"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
