"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import LoveLetterModal from "./LoveLetterModal";
import AudioPlayer from "./AudioPlayer";
import BirthdayQuiz from "./BirthdayQuiz";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Home() {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [wished, setWished] = useState(false);
  const [candleLit, setCandleLit] = useState(true);

  useEffect(() => {
    // Generate soft ambient background floating shimmer dots
    const generated: SparkleParticle[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fff5f7] via-[#fffbfd] to-[#fdf2f5] text-slate-800 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Ambient Lighting & Luminous Pastel Pink Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Rose Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[550px] sm:w-[550px] rounded-full bg-pink-300/30 blur-[100px] sm:blur-[140px] animate-pulse-glow" />

        {/* Blush / Peach Ambient Orb */}
        <div className="absolute top-1/3 -left-20 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-rose-200/35 blur-[90px] sm:blur-[130px]" />

        {/* Warm Cream / Light Blossom Accent */}
        <div className="absolute bottom-1/4 -right-20 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] rounded-full bg-pink-200/25 blur-[100px] sm:blur-[150px]" />

        {/* Delicate Twinkling Shimmer Accents */}
        {sparkles.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-pink-400/40"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `pulseGlow ${star.duration}s infinite ease-in-out ${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Screen 1: Hero Section (Centered in Viewport) */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        {/* Floating Glassmorphism Card */}
        <div className="animate-float w-full max-w-lg md:max-w-2xl mx-auto">
          {/* Outer Specular Glass Gradient Rim */}
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white via-pink-200/60 to-rose-200/40 shadow-[0_20px_50px_rgba(244,114,182,0.2),0_10px_20px_rgba(0,0,0,0.03)]">
            
            {/* Glassmorphic Container using Tailwind backdrop-blur and background-opacity */}
            <div className="relative rounded-3xl bg-white bg-opacity-70 backdrop-blur-xl border border-white border-opacity-80 p-6 sm:p-10 md:p-14 text-center transition-all duration-500 hover:bg-opacity-80 hover:shadow-[0_25px_60px_rgba(244,114,182,0.25)]">
              
              {/* Inner Soft Gradient Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/60 via-transparent to-pink-50/30 opacity-70" />

              {/* Decorative Pill Badge */}
              <div className="relative mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/90 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-pink-700 uppercase">
                  A Special Celebration
                </span>
              </div>

              {/* Card Title: 'Happy Birthday, Rasha' using Premium Serif Font */}
              <h1
                className={`${playfair.className} text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.2] drop-shadow-xs`}
              >
                Happy Birthday,
                <span className="block mt-1 sm:mt-2 font-normal italic text-shimmer">
                  Rasha
                </span>
              </h1>

              {/* Elegant Message Subtext */}
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 font-light max-w-md mx-auto">
                Wishing you a year radiating with grace, unforgettable moments,
                boundless laughter, and the fulfillment of your greatest aspirations.
              </p>

              {/* Interactive Wish Button */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setWished(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_25px_rgba(244,114,182,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(244,114,182,0.55)] active:scale-95"
                >
                  <span>{wished ? "✨ Wish Whispered to the Stars! ✨" : "Make a Birthday Wish 🎂"}</span>
                </button>
              </div>

              {/* Wish Feedback Banner */}
              {wished && (
                <div className="mt-5 rounded-2xl border border-pink-200 bg-pink-50/80 p-3.5 sm:p-4 backdrop-blur-md animate-in fade-in zoom-in duration-500 text-left sm:text-center">
                  <p className="text-xs sm:text-sm font-medium text-pink-800">
                    May every dream you carry in your heart today unfold into reality this year. 🌸
                  </p>
                </div>
              )}

              {/* Minimalist Bouncy Arrow Below the Text pointing to Birthday Message */}
              <div className="mt-8 sm:mt-10 pt-2 sm:pt-4 flex flex-col items-center">
                <a
                  href="#birthday-message"
                  aria-label="Scroll down to birthday message"
                  className="group inline-flex flex-col items-center gap-1.5 text-slate-400 transition-colors duration-300 hover:text-pink-600"
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase group-hover:text-pink-600 transition-colors">
                    Scroll Down
                  </span>
                  <div className="animate-bounce flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-pink-200/80 bg-white/80 backdrop-blur-md shadow-xs transition-all duration-300 group-hover:border-pink-300 group-hover:bg-pink-50">
                    <svg
                      className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-pink-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Screen 2: Birthday Message Section (Visible immediately after scrolling past first screen) */}
      <section
        id="birthday-message"
        className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 text-center border-t border-pink-100"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200/80 text-[11px] font-semibold uppercase tracking-wider text-pink-700 mb-3">
          💌 For Your Eyes Only
        </div>
        <h2
          className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight`}
        >
          A Special Message For Rasha
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm md:text-base max-w-md mx-auto">
          A heartfelt letter sealed with love, written just for you on your special day.
        </p>

        {/* Unlock Birthday Message Pill Button & Modal */}
        <div className="mt-4 sm:mt-6">
          <LoveLetterModal />
        </div>
      </section>

      {/* Screen 3: Birthday Tributes & Wishes Section */}
      <section
        id="tribute"
        className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 border-t border-pink-100"
      >
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200/80 text-[11px] font-semibold uppercase tracking-wider text-pink-700 mb-3">
            Celebrating You
          </div>
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight`}
          >
            A Tribute to Rasha
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base max-w-md mx-auto">
            Celebrating the brilliance, grace, and joy you share with the world.
          </p>
        </div>

        {/* Feature Cards Grid (Responsive 1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: The Birthday Flame */}
          <div className="group rounded-2xl border border-pink-100 bg-white/75 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(244,114,182,0.08)] transition-all duration-500 hover:shadow-[0_15px_35px_rgba(244,114,182,0.18)] hover:border-pink-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-2xl">{candleLit ? "🕯️" : "🌸"}</span>
              <button
                onClick={() => setCandleLit(!candleLit)}
                className="text-xs px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50/80 hover:bg-pink-100 text-pink-700 font-medium transition-colors"
              >
                {candleLit ? "Blow Candle" : "Relight Flame"}
              </button>
            </div>
            <h3 className={`${playfair.className} text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2`}>
              The Birthday Flame
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {candleLit
                ? "Glowing bright with optimism, warmth, and joy for your incredible year ahead."
                : "The flame has carried your wish into the universe! It shall be granted."}
            </p>
          </div>

          {/* Card 2: Elegance & Grace */}
          <div className="group rounded-2xl border border-pink-100 bg-white/75 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(244,114,182,0.08)] transition-all duration-500 hover:shadow-[0_15px_35px_rgba(244,114,182,0.18)] hover:border-pink-200">
            <div className="text-2xl mb-3 sm:mb-4">💎</div>
            <h3 className={`${playfair.className} text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2`}>
              Grace & Brilliance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Here’s to another milestone of commanding your journey with poise, kindness, and effortless elegance.
            </p>
          </div>

          {/* Card 3: New Horizons */}
          <div className="group rounded-2xl border border-pink-100 bg-white/75 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(244,114,182,0.08)] transition-all duration-500 hover:shadow-[0_15px_35px_rgba(244,114,182,0.18)] hover:border-pink-200">
            <div className="text-2xl mb-3 sm:mb-4">🥂</div>
            <h3 className={`${playfair.className} text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2`}>
              Cheers to New Horizons
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              May every sunrise welcome fresh possibilities, and every twilight bring peaceful gratitude and delight.
            </p>
          </div>
        </div>

        {/* Screen 4: Interactive Birthday Quiz Section (At the Bottom) */}
        <div className="mt-14 sm:mt-20">
          <BirthdayQuiz />
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center border-t border-pink-100 pt-6 sm:pt-8">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wider uppercase">
            CRAFTED WITH PRECISION & WARMTH • HAPPY BIRTHDAY, RASHA
          </p>
        </footer>
      </section>

      {/* Floating Audio Player Fixed to Bottom Right */}
      <AudioPlayer />
    </div>
  );
}
