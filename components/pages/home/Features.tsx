// src/components/pages/homes/Features.tsx
import React from "react";

const featuresData = [
  {
    title: "Secure Login with OTP Verification",
    description:
      "Access your account safely using encrypted authentication with optional OTP verification for an extra layer of protection against unauthorized access.",
    illustration: (
      <div className="bg-white p-4 rounded-xl shadow-sm w-48 flex flex-col gap-2 border border-slate-100">
        <div className="text-center text-xs font-semibold text-slate-800 mb-1">
          Login
        </div>
        <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        <div className="h-4 bg-slate-100 rounded-md w-full mb-1"></div>
        <div className="h-6 bg-blue-900 rounded-md w-1/2 mx-auto mt-1 flex items-center justify-center">
          <div className="h-1.5 w-6 bg-white/50 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Real-Time Payment Processing (Paystack)",
    description:
      "Pay school fees and other charges easily through a secure gateway, with real-time status updates and instant confirmation after every transaction.",
    illustration: (
      <div className="bg-white p-5 rounded-2xl shadow-sm w-40 flex flex-col items-center justify-center gap-3 border border-slate-100">
        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white">
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
        <div className="text-[10px] font-semibold text-blue-900 text-center">
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
      <div className="bg-white p-4 rounded-xl shadow-sm w-48 flex flex-col gap-2 border border-slate-100">
        <div className="h-5 bg-slate-100 rounded-md w-full"></div>
        <div className="h-5 bg-slate-100 rounded-md w-full mb-2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-blue-900 rounded-md w-2/3 flex items-center justify-center relative">
            <div className="h-1.5 w-8 bg-white/50 rounded-full"></div>
            {/* Fake Cursor */}
            <svg
              className="absolute -bottom-3 -right-2 w-4 h-4 text-slate-800"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M7 2l12 11.2h-5.8l3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z" />
            </svg>
          </div>
          <div className="h-6 bg-blue-900 rounded-md w-8"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Result Management & GPA Tracking",
    description:
      "View your semester results in detail and automatically track your GPA and CGPA as they are updated by academic staff.",
    illustration: (
      <div className="bg-white p-3 rounded-xl shadow-sm w-56 border border-slate-100">
        <div className="grid grid-cols-4 gap-1 text-[8px] font-bold text-slate-500 mb-2 border-b pb-1">
          <div>ID</div>
          <div className="col-span-2">COURSE NAME</div>
          <div>GRADE</div>
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-1 text-[8px] text-slate-700 py-1 border-b border-slate-50 last:border-0">
            <div>{i}</div>
            <div className="col-span-2 bg-slate-100 h-2 rounded w-3/4"></div>
            <div className="font-semibold">{["A", "B", "A"][i - 1]}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Clearance Tracking System",
    description:
      "Follow your clearance progress across all required units, with clear status indicators and notifications for approvals or rejections.",
    illustration: (
      <div className="bg-white p-3 rounded-xl shadow-sm w-48 border border-slate-100 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-slate-600">Cohen Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">N4,000</span>{" "}
            <span className="text-green-500 bg-green-50 p-0.5 rounded">✅</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-slate-600">Publication Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">N10,000</span>{" "}
            <span className="text-green-500 bg-green-50 p-0.5 rounded">✅</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-slate-600">Bazaar Fee</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">N2,000</span>{" "}
            <span className="text-red-500 bg-red-50 p-0.5 rounded">❌</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Hostel Booking & Allocation",
    description:
      "Explore available hostel options, view room details, and book accommodation based on availability and confirmed payment status.",
    illustration: (
      <div className="bg-white rounded-xl shadow-lg w-40 border border-slate-100 overflow-hidden text-[9px] text-center">
        <div className="py-2 border-b border-slate-100 text-slate-500 flex justify-center items-center gap-1">
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
        <div className="py-1.5 text-slate-600 hover:bg-slate-50">
          Sacred Heart
        </div>
        <div className="py-1.5 text-slate-600 hover:bg-slate-50">
          Saint Francis Hostel
        </div>
        <div className="py-1.5 bg-blue-50 text-blue-700 font-medium relative">
          Regina Hostel
          <svg
            className="absolute top-1 right-2 w-3 h-3 text-slate-800"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M7 2l12 11.2h-5.8l3.3 7.3-2.2.9-3.2-7.4-4.4 4.7z" />
          </svg>
        </div>
        <div className="py-1.5 text-slate-600 hover:bg-slate-50">
          Unity Hostel
        </div>
      </div>
    ),
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-blue-700 font-medium tracking-wide text-sm">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Everything You Need, In One Place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="flex flex-col group">
              {/* Illustration Top Half */}
              <div className="bg-slate-100 rounded-t-3xl h-56 flex items-center justify-center p-6 border border-b-0 border-slate-200 overflow-hidden relative">
                {feature.illustration}
              </div>

              {/* Text Bottom Half */}
              <div className="bg-white border border-slate-200 border-t-0 rounded-b-3xl p-8 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
