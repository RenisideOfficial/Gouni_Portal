// src/app/page.tsx
import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";
import Features from "@/components/pages/home/Features";
import Faqs from "@/components/pages/home/Faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Faqs />
    </>
  );
}
