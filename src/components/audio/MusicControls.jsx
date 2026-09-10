"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

const AUDIO_SRC = "/audio/cloud-jeff-kaale.mp3";

const CREDIT = {
  title: "Music from #Uppbeat (free for Creators!):",
  url: "https://uppbeat.io/t/jeff-kaale/cloud",
  license: "License code: YBOJBCJIFHESW1SD",
};

export default function MusicControls() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const lastBeatRef = useRef(0);
  const thresholdRef = useRef(0.2);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showCredit, setShowCredit] = useState(false);

  const ensureAudio = () => {
    if (audioRef.current) return;
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = volume;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    audioContextRef.current = context;

    const source = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    analyser.connect(context.destination);
    analyserRef.current = analyser;
  };

  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const runLoop = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const loop = () => {
      analyser.getByteFrequencyData(data);
      let bass = 0;
      for (let i = 1; i < 16; i++) bass += data[i];
      bass /= 15;
      const norm = bass / 255;

      thresholdRef.current = thresholdRef.current * 0.94 + norm * 0.06;
      const now = performance.now();
      if (norm > thresholdRef.current * 1.22 && norm > 0.18 && now - lastBeatRef.current > 160) {
        lastBeatRef.current = now;
        window.dispatchEvent(new CustomEvent("fluid-audio", { detail: { intensity: norm } }));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const toggleMusic = () => {
    ensureAudio();
    const audio = audioRef.current;
    const context = audioContextRef.current;

    if (isPlaying) {
      audio.pause();
      stopLoop();
      setIsPlaying(false);
    } else {
      context.resume();
      audio.play().then(() => {
        setIsPlaying(true);
        stopLoop();
        runLoop();
      });
    }

    setShowCredit(true);
  };

  const handleVolume = (value) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  const toggleMute = () => {
    if (volume > 0) {
      handleVolume(0);
    } else {
      handleVolume(0.5);
    }
  };

  useEffect(() => {
    if (!showCredit) return;
    const id = setTimeout(() => setShowCredit(false), 5000);
    return () => clearTimeout(id);
  }, [showCredit]);

  useEffect(() => {
    return () => {
      stopLoop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {showCredit ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="neon-ring relative max-w-xs rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 text-sm backdrop-blur-xl"
          >
            <button onClick={() => setShowCredit(false)} className="absolute right-2 top-2 text-[var(--muted)] hover:text-[var(--foreground)]" aria-label="Close">
              <X size={14} />
            </button>
            <p className="pr-6 text-[var(--foreground)]">{CREDIT.title}</p>
            <a href={CREDIT.url} target="_blank" rel="noopener noreferrer" className="mt-2 block break-words text-[var(--accent)] underline">
              {CREDIT.url}
            </a>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">{CREDIT.license}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="neon-ring flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 backdrop-blur-xl"
      >
        <motion.button
          onClick={toggleMusic}
          animate={!isPlaying ? { scale: [1, 1.14, 1] } : { scale: 1 }}
          transition={
            !isPlaying
              ? { duration: 0.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.6 }
              : { duration: 0.2 }
          }
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-white"
          aria-label="Toggle music"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
        <AnimatePresence initial={false}>
          {isPlaying ? (
            <motion.div
              key="controls"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <button onClick={toggleMute} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--muted)] hover:text-[var(--foreground)]" aria-label="Toggle volume">
                {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => handleVolume(Number(event.target.value))}
                className="w-24 accent-[var(--accent)]"
                aria-label="Volume"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <span className="hidden items-center gap-1 font-mono text-xs text-[var(--muted)] sm:flex">
          <Music size={12} /> Music
        </span>
      </motion.div>
    </div>
  );
}
