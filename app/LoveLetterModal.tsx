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

  // Initialize and track window dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Instant opening: Render modal immediately without blocking delay
  const openModal = () => {
    setIsOpen(true);
    setIsVisible(true);

    // Stagger confetti burst onto next frame so modal opens with 0 lag
    requestAnimationFrame(() => {
      setShowConfetti(true);
      setIsRecycling(true);
    });

    // 5-second confetti burst
    setTimeout(() => {
      setIsRecycling(false); // Stop generating new confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false); // Remove canvas once particles clear
      }, 3500);
    }, 5000);
  };

  // Snappy, smooth exit animation
  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close on Escape key and handle scroll locking
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
            numberOfPieces={windowDimensions.width < 640 ? 140 : 280}
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
          className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_25px_rgba(244,114,182,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_35px_rgba(244,114,182,0.6)] active:scale-95 touch-manipulation w-full max-w-xs sm:w-auto"
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
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop Blur Overlay */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-slate-900/45 backdrop-blur-md transition-all duration-200"
          />

          {/* Centered Digital Handwritten Letter Container */}
          <div
            className={`relative w-full max-w-lg transform transition-all duration-200 ease-out z-10 ${
              isVisible
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-3 opacity-0"
            }`}
          >
            {/* Outer Letter Shadow & Border Wrapper (Mobile Scroll Safe) */}
            <div className="relative max-h-[85vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#fffefc] to-[#fff7f9] p-4 sm:p-7 md:p-9 shadow-[0_20px_60px_rgba(244,114,182,0.3),0_8px_25px_rgba(0,0,0,0.12)] border border-pink-200 text-slate-800">
              
              {/* Clean 'X' Close Icon in Top Right */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-pink-200 bg-white/95 text-slate-600 backdrop-blur-sm transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 hover:scale-105 active:scale-95 touch-manipulation shadow-xs"
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

              {/* Exact Space for Heading: sealed with love from zaman */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4 sm:mb-5 pr-10 sm:pr-12">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white font-serif text-xs font-bold shadow-xs ring-2 ring-pink-200">
                    Z
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-rose-600">
                    sealed with love from zaman
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-pink-900/50 shrink-0">
                  OCTOBER 2026
                </span>
              </div>

              {/* Digital Handwritten Letter Content Area */}
              <div className="space-y-3 sm:space-y-4">
                {/* Salutation */}
                <h2
                  className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight pt-0.5`}
                >
                  Dearest Rasha,
                </h2>

                {/* Body Text Styled as Handwritten Calligraphy */}
                <div
                  className={`${dancingScript.className} text-base sm:text-lg md:text-2xl leading-relaxed sm:leading-loose text-slate-800 space-y-2.5 sm:space-y-3.5 pt-0.5`}
                >
                  <p>
                    On this beautiful day, I wanted to whisper something straight from my heart to yours.
                  </p>
                  
                  <p>
                    You are beyond adorable and so wonderfully cute in everything you do—your laugh, your
                    smile, the sparkle in your eyes that effortlessly lights up my entire world.
                  </p>

                  <p className="font-semibold text-rose-700">
                    I need you to know this truth without a single doubt: you are genuinely the most
                    beautiful, breathtaking girl in this universe, and across all other universes—both the
                    ones that have been found, and every universe that is yet to be found.
                  </p>

                  <p>
                    There has never been, and there will never be, anyone as truly magical and precious as
                    you. Having you in my life is the greatest gift, and celebrating you today is my greatest
                    joy.
                  </p>
                  
                  <p>
                    May your birthday and the year ahead be as endless, bright, and utterly sweet as the
                    love I hold for you.
                  </p>
                </div>

                {/* Exact Sign-off: with all my love zaman */}
                <div className="pt-3 sm:pt-4 border-t border-pink-100 flex flex-col items-end">
                  <p
                    className={`${dancingScript.className} text-xl sm:text-2xl md:text-3xl font-bold text-rose-600 tracking-wide`}
                  >
                    with all my love zaman
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Paper Pattern Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ec489910_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
