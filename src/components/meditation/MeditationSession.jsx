import { motion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';

function clock(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function MeditationSession({ remaining, total, paused, onTogglePause, onEnd }) {
  const elapsed = Math.max(0, total - remaining);
  const breath = elapsed % 10 < 4 ? 'Breathe in' : 'Breathe out';
  const progress = total ? Math.min(1, elapsed / total) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex min-h-screen flex-col px-6 py-7">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onEnd}
            aria-label="End session"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[12px] text-white/80 backdrop-blur">
            {clock(remaining)} left
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-9">
          <motion.div
            animate={
              paused
                ? { scale: 0.9, opacity: 0.75 }
                : { scale: [0.86, 1, 0.86], opacity: [0.8, 1, 0.8] }
            }
            transition={
              paused
                ? { duration: 0.5 }
                : { duration: 10, times: [0, 0.4, 1], repeat: Infinity, ease: 'easeInOut' }
            }
            className="flex h-56 w-56 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20"
          >
            <span className="font-display text-[44px] leading-none text-white">{clock(remaining)}</span>
          </motion.div>

          <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
            {paused ? 'Paused' : breath}
          </p>
        </div>

        <div className="mx-auto w-full max-w-xs">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white/70 transition-all duration-500"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              onClick={onTogglePause}
              aria-label={paused ? 'Resume' : 'Pause'}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary transition-transform active:scale-95"
            >
              {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
