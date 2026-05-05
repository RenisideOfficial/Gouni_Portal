// src/app/(root)/dashboard/admin/help/page.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const helpTopics = [
  {
    title: "User Management",
    description: "How to suspend students, add staff, and reset passwords.",
  },
  {
    title: "Financial Configuration",
    description:
      "Guide on setting fee structures and generating financial reports.",
  },
  {
    title: "Admissions & Clearance",
    description:
      "Steps for approving admissions and generating matric numbers.",
  },
  {
    title: "System Settings",
    description: "Configuring academic sessions, semesters, and portal access.",
  },
];

const faqData = [
  {
    question: "How do I suspend a student?",
    answer:
      "Navigate to the Student Management module, search for the student via Matric Number, and click the alert/suspend icon in the actions column. Suspended students cannot log into their portal.",
  },
  {
    question: "How do I set fees for a new semester?",
    answer:
      "Go to Finances & Fees, click 'Add Fee Category', select the applicable levels and programs, and input the new amount. This updates immediately across all student portals.",
  },
  {
    question: "How is the admission token generated?",
    answer:
      "When you select an applicant and click 'Approve' in the Admissions tab, the system automatically generates an 8-digit token and emails it to the applicant alongside their newly assigned Matriculation Number.",
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
  hidden: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  show: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
};

export default function AdminHelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-12">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">
            Admin Documentation
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            System administrator guides and operational flows.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="border border-border rounded-xl p-6 bg-card cursor-pointer transition-all hover:shadow-md hover:border-blue-900">
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

      <div className="border-t border-border pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3">
            <span className="text-blue-700 dark:text-blue-400 font-medium tracking-wider uppercase text-xs">
              Admin FAQs
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
              Operations FAQ
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quick answers for portal administration workflows.
            </p>
          </motion.div>

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
                  className={`border rounded-lg overflow-hidden transition-colors ${isOpen ? "border-blue-900 bg-blue-50/30 dark:bg-blue-900/20" : "border-border bg-card"}`}>
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
    </div>
  );
}
