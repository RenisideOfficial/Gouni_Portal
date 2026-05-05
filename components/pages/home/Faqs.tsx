// src/components/pages/homes/Faqs.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
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

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full lg:w-1/3">
            <span className="text-blue-700 font-medium tracking-wider uppercase text-sm">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Got Questions?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Find quick answers to common questions about using the GO
              University Portal.
            </p>
          </motion.div>

          {/* Right Side: Accordion */}
          <div className="w-full lg:w-2/3 space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={faqItemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`border rounded-lg overflow-hidden transition-colors duration-300 ${isOpen ? "border-blue-900 bg-blue-50/30" : "border-slate-200"}`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none">
                    <span
                      className={`font-medium ${isOpen ? "text-blue-900" : "text-slate-800"}`}>
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`text-xl ${isOpen ? "text-blue-900" : "text-slate-400"}`}>
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
                          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
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
    </section>
  );
};

export default Faqs;
