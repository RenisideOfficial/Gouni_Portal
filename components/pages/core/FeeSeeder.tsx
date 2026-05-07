"use client";
import { useEffect } from "react";
import { feeStructure as defaultFeeStructure } from "@/lib/constants/finance_data";

export default function FeeSeeder() {
  useEffect(() => {
    // Check if fees exist in the simulated database
    const storedFees = localStorage.getItem("gouni_fees");

    // If not, seed the initial data from the finance_data constant
    if (!storedFees) {
      localStorage.setItem("gouni_fees", JSON.stringify(defaultFeeStructure));

      // Dispatch an event just in case any active component needs to know
      window.dispatchEvent(new Event("storage"));
    }
  }, []);

  // Renders silently in the background
  return null;
}
