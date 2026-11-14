import { Link } from 'react-router-dom';
import { ArrowLeft, Music2, Play } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import QuietModeRow from '@/components/QuietModeRow';

const PRESETS = [3, 5, 10, 15, 20];

export default function MeditationSetup({ minutes, onMinutes, volume, onVolume, onStart }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-5 pb-32 pt-8 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Today
        </Link>

        <h1 className="mt-6 font-display text-[36px] leading-[1.05] tracking-tight text-foreground">Meditation</h1>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Sit comfortably, choose a length, and let slow music hold the silence for you.
        </p>

        <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Length</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onMinutes(option)}
              className={`rounded-full border px-4 py-2.5 text-[13px] transition-colors ${
                minutes === option
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {option} min
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[20px] border border-border px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-[13px] text-foreground">
              <Music2 className="h-4 w-4 text-primary" /> Music
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <Slider
            className="mt-3.5"
            value={[Math.round(volume * 100)]}
            onValueChange={(value) => onVolume((value[0] ?? 0) / 100)}
            max={100}
            step={5}
            aria-label="Music volume"
          />
        </div>

        <div className="mt-3">
          <QuietModeRow />
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-medium text-primary-foreground transition-transform active:scale-[0.99]"
        >
          <Play className="h-4 w-4" /> Begin {minutes} minutes
        </button>

        <p className="mt-4 text-center text-[11.5px] leading-relaxed text-muted-foreground">
          The music is generated on this device and never leaves it.
        </p>
      </div>
    </div>
  );
}
