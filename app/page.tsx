// src/app/page.tsx
import Navbar from "@/components/pages/home/Navbar";
import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import Features from "@/components/pages/home/Features";
import Faqs from "@/components/pages/home/Faqs";
import Footer from "@/components/pages/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <Faqs />
      </main>
      <Footer />
    </div>
  );
}
