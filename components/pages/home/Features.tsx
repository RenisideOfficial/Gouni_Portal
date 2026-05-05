// src/components/pages/homes/Features.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const featuresData = [
  {
    title: "Secure Login with OTP Verification",
    description:
      "Access your account safely using encrypted authentication with optional OTP verification for an extra layer of protection.",
    illustration: (
      <div className="bg-card p-4 rounded-xl shadow-sm w-48 flex flex-col gap-2 border border-border">
        <div className="text-center text-xs font-semibold text-foreground mb-1">
          Login
        </div>
        <div className="h-4 bg-muted rounded-md w-full"></div>
        <div className="h-4 bg-muted rounded-md w-full"></div>
        <div className="h-4 bg-muted rounded-md w-full mb-1"></div>
        <div className="h-6 bg-blue-900 dark:bg-blue-700 rounded-md w-1/2 mx-auto mt-1 flex items-center justify-center">
          <div className="h-1.5 w-6 bg-white/50 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Real-Time Payment Processing",
    description:
      "Pay school fees easily through a secure gateway, with real-time status updates and instant confirmation.",
    illustration: (
      <div className="bg-card p-5 rounded-2xl shadow-sm w-40 flex flex-col items-center justify-center gap-3 border border-border">
        <div className="w-10 h-10 bg-blue-900 dark:bg-blue-700 rounded-full flex items-center justify-center text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div className="text-[10px] font-semibold text-blue-900 dark:text-blue-400 text-center">
          Payment confirmed
        </div>
      </div>
    ),
  },
  {
    title: "Course Registration System",
    description:
      "Register your courses quickly within your department and semester requirements.",
    illustration: (
      <div className="bg-card p-4 rounded-xl shadow-sm w-48 flex flex-col gap-2 border border-border">
        <div className="h-5 bg-muted rounded-md w-full"></div>
        <div className="h-5 bg-muted rounded-md w-full mb-2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-blue-900 dark:bg-blue-700 rounded-md w-2/3 flex items-center justify-center relative">
            <div className="h-1.5 w-8 bg-white/50 rounded-full"></div>
            <svg
              className="absolute -bottom-3 -right-2 w-4 h-4 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M7 2l12 11.2h-5.8l3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z" />
            </svg>
          </div>
          <div className="h-6 bg-blue-900 dark:bg-blue-700 rounded-md w-8"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Result Management Tracking",
    description:
      "View your semester results in detail and automatically track your GPA and CGPA as they are updated.",
    illustration: (
      <div className="bg-card p-3 rounded-xl shadow-sm w-56 border border-border">
        <div className="grid grid-cols-4 gap-1 text-[8px] font-bold text-muted-foreground mb-2 border-b border-border pb-1">
          <div>ID</div>
          <div className="col-span-2">COURSE NAME</div>
          <div>GRADE</div>
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-1 text-[8px] text-foreground py-1 border-b border-border last:border-0">
            <div>{i}</div>
            <div className="col-span-2 bg-muted h-2 rounded w-3/4"></div>
            <div className="font-semibold">{["A", "B", "A"][i - 1]}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Clearance Tracking System",
    description:
      "Follow your clearance progress across all required units, with clear status indicators.",
    illustration: (
      <div className="bg-card p-3 rounded-xl shadow-sm w-48 border border-border flex flex-col gap-2">
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-muted-foreground">Cohon Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">N4,000</span>{" "}
            <span className="text-green-500 bg-green-50 dark:bg-green-900/30 p-0.5 rounded">
              ✅
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-muted-foreground">Publication Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">N10,000</span>{" "}
            <span className="text-green-500 bg-green-50 dark:bg-green-900/30 p-0.5 rounded">
              ✅
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-muted-foreground">Bazaar Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">N2,000</span>{" "}
            <span className="text-red-500 bg-red-50 dark:bg-red-900/30 p-0.5 rounded">
              ❌
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Hostel Booking & Allocation",
    description:
      "Explore available hostel options, view room details, and book accommodation based on availability.",
    illustration: (
      <div className="bg-card rounded-xl shadow-lg w-40 border border-border overflow-hidden text-[9px] text-center">
        <div className="py-2 border-b border-border text-muted-foreground flex justify-center items-center gap-1">
          Select Hostel{" "}
          <svg
            className="w-2 h-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div className="py-1.5 text-muted-foreground">Sacred Heart</div>
        <div className="py-1.5 text-muted-foreground">Saint Francis Hostel</div>
        <div className="py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium relative">
          Regina Hostel
          <svg
            className="absolute top-1 right-2 w-3 h-3 text-foreground"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M7 2l12 11.2h-5.8l3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z" />
          </svg>
        </div>
        <div className="py-1.5 text-muted-foreground">Unity Hostel</div>
      </div>
    ),
  },
];

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16">
          <span className="text-blue-700 dark:text-blue-400 font-medium tracking-wide text-sm uppercase">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Everything You Need, In One Place
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              whileHover={{ y: -8 }}
              className="flex flex-col group cursor-pointer">
              <div className="bg-muted/50 rounded-t-3xl h-56 flex items-center justify-center p-6 border border-b-0 border-border overflow-hidden relative transition-colors duration-300 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {feature.illustration}
                </motion.div>
              </div>
              <div className="bg-card border border-border border-t-0 rounded-b-3xl p-8 flex-grow transition-shadow duration-300 group-hover:shadow-lg">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
