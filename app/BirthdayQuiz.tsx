"use client";

import React, { useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

interface QuestionItem {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
}

const quizQuestions: QuestionItem[] = [
  {
    id: 1,
    question: "Who is unquestionably the most beautiful girl in the entire world?",
    optionA: "Rasha",
    optionB: "Obviously, Rasha",
  },
  {
    id: 2,
    question: "Whose breathtaking and heavenly beauty outshines every star in the cosmos?",
    optionA: "Rasha, the prettiest girl in existence",
    optionB: "Yours, the most gorgeous girl ever",
  },
  {
    id: 3,
    question: "If there was a global award for looking effortlessly gorgeous, who is taking home the trophy?",
    optionA: "You do",
    optionB: "The birthday girl reading this",
  },
  {
    id: 4,
    question: "Who is officially guilty of being way too cute and completely stealing my heart forever?",
    optionA: "Rasha, guilty as charged",
    optionB: "You, the prettiest girl alive",
  },
  {
    id: 5,
    question: "Will you be mine forever?",
    optionA: "Yes",
    optionB: "Definitely Yes",
  },
];

export default function BirthdayQuiz() {
  const [gameState, setGameState] = useState<"warning" | "playing" | "completed">("warning");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle clicking either option (both advance instantly)
  const handleAnswerClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        setGameState("completed");
        setIsTransitioning(false);
      }
    }, 150);
  };

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto my-8 sm:my-12 px-4">
      {/* Outer Specular Rim */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white via-pink-200/60 to-rose-200/40 shadow-[0_20px_50px_rgba(244,114,182,0.18),0_10px_20px_rgba(0,0,0,0.03)]">
        
        {/* Core Glassmorphism Card */}
        <div className="relative rounded-3xl bg-white bg-opacity-80 backdrop-blur-xl border border-white border-opacity-90 p-6 sm:p-9 md:p-10 text-center overflow-hidden">
          
          {/* Subtle Inner Glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-pink-50/40 opacity-70" />

          {/* 1. INITIAL WARNING STATE */}
          {gameState === "warning" && (
            <div className="relative z-10 flex flex-col items-center justify-center py-4 sm:py-6 animate-in fade-in zoom-in-95 duration-300">
              {/* Warning Icon Badge */}
              <div className="mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 via-pink-400/20 to-rose-400/20 border border-pink-200/80 shadow-[0_0_25px_rgba(244,114,182,0.25)]">
                <span className="text-2xl sm:text-3xl animate-bounce">⚠️</span>
              </div>

              {/* Quiz Badge */}
              <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[11px] font-semibold tracking-wider text-pink-700 uppercase">
                The Rasha & Zaman Quiz
              </div>

              {/* Exact Warning Text */}
              <h2
                className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug max-w-md mx-auto my-3`}
              >
                Warning: You are trapped with me if you correct all 5 answers.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-light max-w-sm mx-auto mb-7">
                Proceed only if you are ready to face 5 questions about someone extraordinarily beautiful.
              </p>

              {/* Start Quiz Button */}
              <button
                onClick={() => setGameState("playing")}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_25px_rgba(244,114,182,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_35px_rgba(244,114,182,0.6)] active:scale-95 touch-manipulation"
              >
                <span>Start Quiz</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          )}

          {/* 2. PLAYING / QUIZ IN PROGRESS STATE */}
          {gameState === "playing" && (
            <div
              className={`relative z-10 flex flex-col items-center py-2 sm:py-4 transition-opacity duration-150 ${
                isTransitioning ? "opacity-30" : "opacity-100"
              }`}
            >
              {/* Question Progress Tracker */}
              <div className="w-full mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-pink-900/60 mb-2">
                  <span className="font-semibold uppercase tracking-wider text-rose-600">
                    Question {currentIndex + 1} of 5
                  </span>
                  <span>100% Correct Rate ✨</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden border border-pink-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="min-h-[90px] sm:min-h-[100px] flex items-center justify-center">
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug`}
                >
                  {currentQ.question}
                </h3>
              </div>

              {/* Option A & Option B Buttons */}
              <div className="w-full mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
                {/* Option A */}
                <button
                  onClick={handleAnswerClick}
                  className="group relative flex items-center justify-between w-full rounded-2xl border border-pink-200 bg-white/90 p-4 sm:p-4.5 text-left transition-all duration-200 hover:border-pink-300 hover:bg-pink-50/90 hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(244,114,182,0.18)] active:scale-[0.99] touch-manipulation shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs sm:text-sm font-bold text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      A
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-800 group-hover:text-rose-900 transition-colors">
                      {currentQ.optionA}
                    </span>
                  </div>
                  <span className="text-pink-400 group-hover:text-rose-500 transition-colors text-sm font-semibold">
                    ✓
                  </span>
                </button>

                {/* Option B */}
                <button
                  onClick={handleAnswerClick}
                  className="group relative flex items-center justify-between w-full rounded-2xl border border-pink-200 bg-white/90 p-4 sm:p-4.5 text-left transition-all duration-200 hover:border-pink-300 hover:bg-pink-50/90 hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(244,114,182,0.18)] active:scale-[0.99] touch-manipulation shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs sm:text-sm font-bold text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      B
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-800 group-hover:text-rose-900 transition-colors">
                      {currentQ.optionB}
                    </span>
                  </div>
                  <span className="text-pink-400 group-hover:text-rose-500 transition-colors text-sm font-semibold">
                    ✓
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* 3. FINAL SUCCESS / END STATE */}
          {gameState === "completed" && (
            <div className="relative z-10 flex flex-col items-center justify-center py-6 sm:py-8 animate-in fade-in zoom-in-95 duration-500">
              {/* Celebratory Icon */}
              <div className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 text-white shadow-[0_0_35px_rgba(244,114,182,0.45)] text-3xl sm:text-4xl">
                👑
              </div>

              {/* Trap Confirmed Pill */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 uppercase tracking-wider">
                Trapped Forever Confirmed 💕
              </div>

              {/* Exact Required Success Text */}
              <h2
                className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-snug my-2`}
              >
                Congratulations for getting all 5 answers correct! Happy Birthday Rasha!
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 font-light max-w-md mx-auto leading-relaxed">
                You passed with flying colors! No matter what option you chose, every path in this universe leads straight back to you being the most cherished, loved, and beautiful girl in existence.
              </p>

              {/* Play Again Option */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setGameState("playing");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-6 py-2.5 text-xs sm:text-sm font-medium text-pink-700 hover:bg-pink-100 transition-colors"
                >
                  <span>Replay Quiz 🔁</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
