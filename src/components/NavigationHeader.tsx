"use client";

import { useState } from "react";
import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* Left section (logo + desktop nav) */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="relative">
                <span className=" text-md md:text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  Xtrem Snippets
                </span>
                <span className="hidden md:block text-xs text-blue-400/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
              border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Show Pro only on desktop */}
            <SignedOut>
              <Link
                href="/pricing"
                className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20
                hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            </SignedOut>

            {/* Profile always shown */}
            <div className="hidden md:flex">
            <HeaderProfileBtn />

            </div>
           

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-2 px-2 pb-4">
            <HeaderProfileBtn />
            <Link
              href="/snippets"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-gray-200 hover:bg-blue-500/20 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Code2 className="w-4 h-4" />
              <span>Snippets</span>
            </Link>

            <SignedOut>
              <Link
                href="/pricing"
                className="flex  items-center gap-2 px-4 py-2 rounded-md bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Pro</span>
              </Link>

               
            </SignedOut>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationHeader;
