// src/components/pages/homes/About.tsx
import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <span className="text-blue-700 font-semibold uppercase text-sm">
            About
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
            One Portal. <br /> Every Service.
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            The GO University Portal brings all your essential services into one
            place — from course registration and fee payments to results,
            clearance, and hostel booking.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Designed for simplicity, speed, and security, it helps students,
            parents, and staff get things done without stress.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
