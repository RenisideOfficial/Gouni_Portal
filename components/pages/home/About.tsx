// src/components/pages/homes/About.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const leftBlockVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightBlockVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          variants={leftBlockVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2">
          <span className="text-blue-700 font-semibold uppercase tracking-wider text-sm">
            About
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
            One Portal. <br /> Every Service.
          </h2>
        </motion.div>

        <motion.div
          variants={rightBlockVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            The GO University Portal brings all your essential services into one
            place — from course registration and fee payments to results,
            clearance, and hostel booking.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Designed for simplicity, speed, and security, it helps students,
            parents, and staff get things done without stress.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
