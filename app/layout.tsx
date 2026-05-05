// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GO University Portal",
  description:
    "Official student portal for Godfrey Okoye University. Access your academic records, fee payments, course registration, results, and hostel booking in one secure platform.",
  icons: {
    icon: [{ url: "/images/gouni_logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/gouni_logo.svg" }],
  },
  openGraph: {
    title: "GO University Portal",
    description:
      "Official student portal for Godfrey Okoye University. Access your academic records, fee payments, course registration, results, and hostel booking in one secure platform.",
    url: "https://portal.gouni.edu.ng", // Updated to reflect a standard university portal URL
    siteName: "GO University Portal",
    images: [
      {
        url: "/images/gouni_logo.png",
        width: 1200,
        height: 630,
        alt: "GO University Portal Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GO University Portal",
    description:
      "Official student portal for Godfrey Okoye University. Access your academic records, fee payments, course registration, results, and hostel booking in one secure platform.",
    images: ["/images/gouni_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.className} min-h-screen bg-white`}
        suppressHydrationWarning>
        <ThemeProvider defaultTheme="system" storageKey="gouni-portal-theme">
          <AuthProvider>
            {/* Notice Navbar and Footer are GONE from here */}
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
