// src/app/(root)/dashboard/student/help/page.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const helpTopics = [
  {
    title: "Account & Login",
    description:
      "Help with account activation, login issues, and password reset.",
  },
  {
    title: "Course Registration",
    description:
      "Step-by-step guide to selecting and registering your courses.",
  },
  {
    title: "Results",
    description: "Understand how to view results and track GPA/CGPA.",
  },
  {
    title: "Clearance",
    description:
      "Learn how clearance works and track your progress across units.",
  },
  {
    title: "Hostel",
    description:
      "Help with viewing, booking, and managing hostel accommodation.",
  },
];

const faqData = [
  {
    question: "How do I activate my account?",
    answer:
      "Use your matriculation number and activation token provided by the school, then follow the guided steps to set up your account.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "You can easily reset it using the 'Forgot Password' link on the login page. A secure One-Time Password (OTP) will be sent to your registered email address to verify your identity before allowing you to create a new password.",
  },
  {
    question: "How can I pay my school fees?",
    answer:
      "Log into your portal, navigate to the Payments section, and generate an invoice for the current semester. You can then securely pay online using your card or USSD via the integrated Paystack gateway.",
  },
  {
    question: "Why can't I register my courses?",
    answer:
      "Course registration may be blocked if you have outstanding fees that exceed the allowable threshold, or if you are attempting to register outside of the official academic calendar's registration window.",
  },
  {
    question: "When will my results be available?",
    answer:
      "Semester results are computed and uploaded by your academic staff. They will become instantly visible on your dashboard under the 'Results' tab as soon as they are officially published by the department.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const accordionVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function DashboardHelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-12">
      {/* Top Section: Help Topics */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground text-sm mt-1">
            What do you need help with?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4">
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="border border-border rounded-xl p-6 bg-card cursor-pointer transition-all duration-300 hover:shadow-md hover:border-blue-900 dark:hover:border-blue-500">
              <h3 className="font-semibold text-foreground mb-1">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Middle Section: FAQs */}
      <div className="border-t border-border pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* FAQ Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3">
            <span className="text-blue-700 dark:text-blue-400 font-medium tracking-wider uppercase text-xs">
              FAQs
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
              Got Questions?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find quick answers to common questions about using the GO
              University Portal.
            </p>
          </motion.div>

          {/* FAQ Right Side: Accordion */}
          <div className="w-full lg:w-2/3 space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "border-blue-900 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-900/20"
                      : "border-border bg-card"
                  }`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none">
                    <span
                      className={`text-sm font-medium ${isOpen ? "text-blue-900 dark:text-blue-400" : "text-foreground"}`}>
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`text-xl ${isOpen ? "text-blue-900 dark:text-blue-400" : "text-muted-foreground"}`}>
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden">
                        <div className="px-6 pb-5">
                          <p className="text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Still Need Help? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-blue-900 dark:bg-blue-800 rounded-3xl p-10 md:p-14 text-center shadow-xl mt-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Still Need Help?
        </h3>
        <p className="text-blue-100 text-sm md:text-base mb-8 max-w-lg mx-auto">
          If you can't find what you're looking for, contact the ICT support
          team for assistance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-sm text-sm">
            Contact Support
          </button>
          <button className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors text-sm">
            Send Message
          </button>
        </div>
      </motion.div>
    </div>
  );
}
