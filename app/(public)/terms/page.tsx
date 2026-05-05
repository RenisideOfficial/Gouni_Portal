// src/app/terms/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const termsSections = [
  {
    title: "Eligibility",
    content: (
      <>
        <p className="mb-2">
          This portal is intended for authorized users only, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Students of Godfrey Okoye University</li>
          <li>Parents/guardians with valid access</li>
          <li>Academic and administrative staff</li>
        </ul>
        <p>Users must have valid login credentials issued by the university.</p>
      </>
    ),
  },
  {
    title: "User Responsibilities",
    content: (
      <>
        <p className="mb-2">Users agree to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Provide accurate and up-to-date information</li>
          <li>Maintain the confidentiality of their login credentials</li>
          <li>
            Use the portal only for legitimate academic and administrative
            purposes
          </li>
          <li>Log out after each session on shared devices</li>
        </ul>
        <p>
          Users are responsible for all activities carried out under their
          accounts.
        </p>
      </>
    ),
  },
  {
    title: "Prohibited Activities",
    content: (
      <>
        <p className="mb-2">Users must not:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Attempt to gain unauthorized access to any part of the system</li>
          <li>Share login credentials with others</li>
          <li>Manipulate academic records or payment data</li>
          <li>
            Upload malicious files or attempt to disrupt system operations
          </li>
          <li>Use the portal for any unlawful or fraudulent activity</li>
        </ul>
        <p>
          Violation of these rules may result in suspension or termination of
          access.
        </p>
      </>
    ),
  },
  {
    title: "Payments and Transactions",
    content: (
      <>
        <p className="mb-2">
          All payments made through the portal must follow the approved payment
          process.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Payments are processed through secure third-party providers.</li>
          <li>
            The university is not responsible for failed transactions caused by
            network or banking issues.
          </li>
          <li>
            Users must verify payment details before confirming transactions.
          </li>
        </ul>
        <p>
          Successful payments will be recorded and reflected in the user's
          account.
        </p>
      </>
    ),
  },
  {
    title: "Academic Data and Records",
    content: (
      <>
        <p className="mb-2">
          The portal provides access to academic records such as:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Course registrations</li>
          <li>Results and GPA</li>
          <li>Clearance status</li>
        </ul>
        <p>
          Users may view and download this data but must not attempt to alter or
          misuse it.
        </p>
      </>
    ),
  },
  {
    title: "System Availability",
    content: (
      <>
        <p className="mb-2">
          The university aims to provide reliable access to the portal. However:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>
            The system may be temporarily unavailable due to maintenance or
            technical issues.
          </li>
          <li>
            The university does not guarantee uninterrupted access at all times.
          </li>
        </ul>
        <p>Users will be notified of scheduled maintenance when possible.</p>
      </>
    ),
  },
  {
    title: "Privacy and Data Protection",
    content: (
      <p>
        User data is handled in accordance with the university's Privacy Policy
        and relevant data protection regulations, including the{" "}
        <span className="text-blue-700 font-medium">
          Nigeria Data Protection Regulation (NDPR)
        </span>
        .
      </p>
    ),
  },
  {
    title: "Account Suspension and Termination",
    content: (
      <>
        <p className="mb-2">The university reserves the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Suspend or terminate accounts that violate these terms</li>
          <li>Restrict access to certain features when necessary</li>
          <li>Take disciplinary action in line with university policies</li>
        </ul>
      </>
    ),
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-slate-600 text-left md:text-center max-w-3xl mx-auto leading-relaxed">
          Welcome to the Godfrey Okoye University Student Portal. These Terms of
          Service govern your access to and use of the portal and its services.
          By accessing or using the portal, you agree to comply with these
          terms. If you do not agree, you should not use the system.
        </p>
      </motion.div>

      <div className="space-y-12">
        {termsSections.map((section, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-t border-slate-100 pt-12 first:border-0 first:pt-0">
            <div className="md:col-span-4">
              <h2 className="text-xl font-medium text-slate-900 sticky top-24">
                {section.title}
              </h2>
            </div>
            <div className="md:col-span-8 text-slate-600 text-sm md:text-base leading-relaxed">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
