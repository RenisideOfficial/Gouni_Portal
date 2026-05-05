// src/app/privacy/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const policySections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-2">
          We collect personal and academic information necessary to provide
          portal services, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Full name, matriculation number, and student ID</li>
          <li>Email address and phone number</li>
          <li>Academic records (courses, results, GPA)</li>
          <li>Financial information (payment history, invoices)</li>
          <li>Hostel and clearance records</li>
          <li>Login and activity data (for security and auditing)</li>
        </ul>
      </>
    ),
  },
  {
    title: "How Your Information Is Used",
    content: (
      <>
        <p className="mb-2">
          Your information is used strictly for academic and administrative
          purposes, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Managing student accounts and authentication</li>
          <li>Processing school fee payments</li>
          <li>Enabling course registration and result access</li>
          <li>Managing hostel bookings and clearance processes</li>
          <li>Communicating important updates and notifications</li>
          <li>Maintaining system security and audit logs</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Protection and Security",
    content: (
      <>
        <p className="mb-2">
          We implement appropriate technical and organizational measures to
          protect your data, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Secure authentication and session management</li>
          <li>Encryption of data in transit (HTTPS)</li>
          <li>Role-based access control to restrict unauthorized access</li>
          <li>Regular system monitoring and audit logging</li>
        </ul>
        <p>
          No sensitive financial data (such as card details) is stored on
          university servers.
        </p>
      </>
    ),
  },
  {
    title: "Data Sharing and Disclosure",
    content: (
      <>
        <p className="mb-2">
          Your personal data will not be sold or shared with third parties
          except:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>
            When required for payment processing through authorized providers
          </li>
          <li>When required by law or regulatory authorities</li>
          <li>
            When necessary for internal academic and administrative operations
          </li>
        </ul>
        <p>
          Parents/guardians may access student data only through authorized
          linking provided by the student.
        </p>
      </>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        Your data will be retained for as long as necessary to fulfill academic,
        administrative, and legal obligations of the university.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p className="mb-2">As a user, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access your personal data</li>
          <li>Request corrections to inaccurate information</li>
          <li>Request updates to your profile details</li>
          <li>Report any misuse of your data</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cookies and Tracking",
    content: (
      <p>
        The portal may use session-based cookies to maintain secure login
        sessions and improve user experience. These cookies do not store
        sensitive personal information.
      </p>
    ),
  },
  {
    title: "Compliance with Regulations",
    content: (
      <p>
        This portal complies with the{" "}
        <span className="text-blue-700 font-medium">
          Nigeria Data Protection Regulation (NDPR)
        </span>{" "}
        and other applicable data protection laws in Nigeria.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p>
        This Privacy Policy may be updated periodically. Users will be notified
        of any significant changes through the portal or email.
      </p>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact:
        <br />
        <span className="font-medium text-slate-800 mt-2 block">
          ICT Directorate
        </span>
        Godfrey Okoye University
        <br />
        Email:{" "}
        <a
          href="mailto:info@gouni.edu.ng"
          className="text-blue-700 hover:underline">
          info@gouni.edu.ng
        </a>
      </p>
    ),
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-slate-600 text-left md:text-center max-w-3xl mx-auto leading-relaxed">
          Godfrey Okoye University is committed to protecting the privacy and
          personal data of all users of the Student Portal. This Privacy Policy
          explains how information is collected, used, stored, and protected
          when you access and use the portal. By using the portal, you agree to
          the terms outlined in this policy.
        </p>
      </motion.div>

      <div className="space-y-12">
        {policySections.map((section, index) => (
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
