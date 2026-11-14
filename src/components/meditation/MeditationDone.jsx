import { Moon } from 'lucide-react';

export default function MeditationDone({ minutes, onDone, onAgain }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md px-5 pb-32 pt-14 sm:px-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent">
          <Moon className="h-5 w-5" />
        </span>
        <h1 className="mt-6 font-display text-[34px] leading-[1.08] tracking-tight text-foreground">
          Sit complete.
        </h1>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
          {minutes} {minutes === 1 ? 'minute' : 'minutes'} of stillness. Notice how you feel before you move on.
        </p>

        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onAgain}
            className="rounded-2xl bg-primary py-3.5 text-[14px] font-medium text-primary-foreground transition-transform active:scale-[0.99]"
          >
            Sit again
          </button>
          <button
            type="button"
            onClick={onDone}
            className="rounded-2xl border border-border py-3.5 text-[14px] font-medium text-foreground"
          >
            Back to today
          </button>
        </div>
      </div>
    </div>
  );
}
