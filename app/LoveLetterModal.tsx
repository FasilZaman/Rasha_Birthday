"use client";

import React, { useState, useEffect } from "react";
import { Dancing_Script, Playfair_Display } from "next/font/google";
import Confetti from "react-confetti";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export default function LoveLetterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRecycling, setIsRecycling] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // Track window dimensions for responsive full-screen confetti
  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle open with smooth animation and 5-second confetti burst
  const openModal = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setIsRecycling(true);

    setTimeout(() => {
      setIsVisible(true);
    }, 20);

    // Trigger 5-second confetti burst
    setTimeout(() => {
      setIsRecycling(false); // Stop generating new confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false); // Remove canvas after existing particles fall
      }, 4000);
    }, 5000);
  };

  // Handle close with smooth animation exit
  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // matches transition duration
  };

  // Close on Escape key press and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* 5-Second Confetti Burst via react-confetti */}
      {showConfetti && windowDimensions.width > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={isRecycling}
            numberOfPieces={windowDimensions.width < 640 ? 160 : 300}
            gravity={0.25}
            colors={[
              "#f43f5e",
              "#ec4899",
              "#fb7185",
              "#fbcfe8",
              "#f59e0b",
              "#fbbf24",
              "#a855f7",
              "#ffffff",
            ]}
          />
        </div>
      )}

      {/* Sleek, Pill-shaped Trigger Button */}
      <div className="flex justify-center my-6 sm:my-8 px-4">
        <button
          onClick={openModal}
          className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_25px_rgba(244,114,182,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_35px_rgba(244,114,182,0.6)] active:scale-95 w-full max-w-xs sm:w-auto"
          aria-label="Unlock Your Birthday Message"
        >
          <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/20 text-white text-xs sm:text-sm group-hover:scale-110 transition-transform">
            💌
          </span>
          <span className="tracking-wide">Unlock Your Birthday Message</span>
          <svg
            className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Full-Screen Modal with Heavily Blurred Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop Blur Overlay */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-all duration-300"
          />

          {/* Centered Digital Handwritten Letter Container */}
          <div
            className={`relative w-full max-w-lg transform transition-all duration-300 ease-out z-10 ${
              isVisible
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-4 opacity-0"
            }`}
          >
            {/* Outer Letter Shadow & Border Wrapper */}
            <div className="relative max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#fffefc] to-[#fff7f9] p-5 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(244,114,182,0.3),0_10px_30px_rgba(0,0,0,0.15)] border border-pink-200 text-slate-800">
              
              {/* Clean 'X' Close Icon in Top Right */}
              <button
                onClick={closeModal}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-pink-200 bg-white/90 text-slate-600 backdrop-blur-sm transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 hover:scale-105 active:scale-95 shadow-xs"
                aria-label="Close modal"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Decorative Wax Seal Accent */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-serif text-xs font-bold shadow-xs ring-2 ring-pink-200">
                    R
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-pink-900/60 uppercase">
                    Sealed with Love
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-mono text-pink-900/50 pr-7 sm:pr-0">
                  OCTOBER 2026
                </span>
              </div>

              {/* Digital Handwritten Letter Content Area */}
              <div className="space-y-3 sm:space-y-4">
                {/* Salutation */}
                <h2
                  className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight`}
                >
                  Dearest Rasha,
                </h2>

                {/* Body Text Styled as Handwritten Prose */}
                <div
                  className={`${dancingScript.className} text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose text-slate-800 space-y-3 sm:space-y-4 pt-1`}
                >
                  <p>
                    On this very special day, I wanted to take a quiet moment to celebrate the wonderful,
                    luminous person that you are.
                  </p>
                  <p>
                    Your kindness brings warmth to every space you enter, and your strength inspires
                    everyone fortunate enough to walk alongside you. May this upcoming year be generous
                    with its laughter, gentle with its challenges, and brimming with moments that take your
                    breath away.
                  </p>
                  <p>
                    Never forget how deeply appreciated and celebrated you are—not just today, but in every
                    single chapter yet to be written.
                  </p>
                </div>

                {/* Sign-off */}
                <div className="pt-3 sm:pt-4 border-t border-pink-100 flex flex-col items-end">
                  <p className="text-[10px] sm:text-xs font-mono tracking-wider text-pink-900/60 uppercase">
                    With warmest affection & joy,
                  </p>
                  <p
                    className={`${dancingScript.className} text-2xl sm:text-3xl font-bold text-rose-600 mt-0.5`}
                  >
                    Happy Birthday Always ♡
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Paper Lines Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ec489910_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
