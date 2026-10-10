"use client";

import React, { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src?: string;
}

export default function AudioPlayer({ src = "/birthday-melody.wav" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayState = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Audio play prevented:", error);
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Underlying HTML5 Audio element */}
      <audio ref={audioRef} src={src} loop preload="auto" />

      {/* Minimal Floating Music Toggle Button */}
      <button
        onClick={togglePlayState}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause background music" : "Play background music"}
        className={`group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          isPlaying
            ? "border-pink-300 bg-white/95 text-rose-500 shadow-[0_8px_25px_rgba(244,114,182,0.35)] ring-2 ring-pink-300/40"
            : "border-pink-200/80 bg-white/85 text-slate-500 hover:border-pink-300 hover:bg-white hover:text-rose-500"
        }`}
      >
        {isPlaying ? (
          /* Animated equalizer bars when active */
          <div className="flex items-end justify-center gap-1 h-4 w-4 sm:h-5 sm:w-5">
            <span className="w-1 bg-rose-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3.5" />
            <span className="w-1 bg-pink-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-4.5" />
            <span className="w-1 bg-rose-500 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" />
          </div>
        ) : (
          /* Minimalist music note icon with subtle indicator */
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-105"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 0v11.25a3.75 3.75 0 11-3.75-3.75M19.5 6V3.75a3 3 0 00-3-3H9a3 3 0 00-3 3V18a3.75 3.75 0 11-3.75-3.75"
            />
          </svg>
        )}

        {/* Ambient Ring Glow while playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-pink-400/20 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
}
