// src/components/pages/homes/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background pt-12 pb-8 border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Blue CTA Box */}
        <div className="bg-blue-900 rounded-3xl p-10 md:p-16 text-center mb-16 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Access Your Portal?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Login or activate your account to manage your academic activities in
            one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
              Login
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
              Activate Account
            </Link>
          </div>
        </div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/gouni_logo.svg"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-bold text-lg text-foreground">
                Godfrey Okoye University
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              Address: P.M.B 01014, Thinkers Corner, Enugu 400001, Enugu
            </p>
            <p className="text-muted-foreground text-sm">
              Email: info@gouni.edu.ng
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#support" className="hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link href="/help" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          © {new Date().getFullYear()} Godfrey Okoye University. All Right
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
