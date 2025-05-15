// app/components/HeaderClient.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utls"; // Optional utility for conditional classNames

const HeaderClient = ({ convexUser }: { convexUser: any }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-10">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl p-4 mb-4 rounded-lg flex-wrap lg:flex-nowrap">
        {/* Logo + Nav */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
              <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                Xtrem Snippets
              </span>
              <span className="block text-xs text-blue-400/60 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Mobile menu toggle */}
      
<button
  className="
    lg:hidden p-2 rounded-md border border-gray-700
    text-gray-300 hover:text-white hover:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-colors duration-300 ease-in-out
    flex items-center justify-center
  "
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? (
    <X className="w-6 h-6" />
  ) : (
    <Menu className="w-6 h-6" />
  )}
</button>
        </div>

        {/* Nav Items */}
        <div
          className={cn(
            "flex-col lg:flex-row flex w-full lg:w-auto items-start lg:items-center gap-4 lg:gap-4 mt-4 lg:mt-0 transition-all",
            mobileMenuOpen ? "flex" : "hidden lg:flex"
          )}
        >
          <nav className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-4">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            )}

            <SignedIn>
              <RunButton />
            </SignedIn>

            <div className="pl-3 border-l border-gray-800">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
