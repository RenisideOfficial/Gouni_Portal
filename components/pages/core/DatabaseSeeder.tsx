// src/components/core/DatabaseSeeder.tsx
"use client";
import { useEffect } from "react";

export default function DatabaseSeeder() {
  useEffect(() => {
    // Only run this on the client side
    if (typeof window === "undefined") return;

    // 1. Fetch current simulated database
    const existingUsers = JSON.parse(
      localStorage.getItem("gouni_users") || "[]",
    );

    // 2. Check if a Super Admin already exists
    const adminExists = existingUsers.some(
      (user: any) => user.role === "admin",
    );

    // 3. If no admin exists, seed the default Admin account
    if (!adminExists) {
      const defaultAdmin = {
        id: "GOU/ADMIN/001",
        adminId: "admin", // Custom identifier for easy login
        role: "admin",
        firstName: "System",
        lastName: "Administrator",
        name: "System Admin",
        email: "admin@gouni.edu.ng",
        password: "admin", // Super simple password for presentation purposes
        phone: "+234 800 000 0000",
        roleLevel: "Super Administrator",
        status: "Active",
      };

      // Push to database
      localStorage.setItem(
        "gouni_users",
        JSON.stringify([...existingUsers, defaultAdmin]),
      );

      console.log("🌱 System Database Seeded: Default Admin Created");
    }
  }, []);

  return null; // This is a logic-only component, it renders nothing to the screen
}
