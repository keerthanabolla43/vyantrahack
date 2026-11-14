import { ArrowRight, RotateCcw, Timer } from 'lucide-react';

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

export default function SessionSummary({ summary, onDone, onAgain }) {
  const hasHolds = summary.holds.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-[28px] bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Session complete</p>
          <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <Timer className="h-3.5 w-3.5" />
            {formatDuration(summary.durationSec)}
          </span>
        </div>

        {hasHolds ? (
          <>
            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-[60px] leading-none text-foreground">{summary.score}</span>
              <div className="pb-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">average alignment</p>
                <p className="text-[12px] text-muted-foreground">best hold {summary.best}</p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              {summary.holds.map((hold, index) => (
                <div
                  key={`${hold.poseId}-${index}`}
                  className={`flex items-center justify-between px-4 py-3 ${index > 0 ? 'border-t border-border' : ''}`}
                >
                  <div>
                    <p className="text-[14px] font-medium text-foreground">{hold.name}</p>
                    <p className="text-[11px] text-muted-foreground">{hold.seconds}s held</p>
                  </div>
                  <p className="font-display text-xl text-foreground">{hold.avgScore}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border px-4 py-6 text-center">
            <p className="text-[14px] font-medium text-foreground">No pose was held long enough</p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              Hold a shape for at least a couple of seconds with your whole body in frame and it will be scored.
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onAgain}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border text-foreground"
            aria-label="Practice again"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDone}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-medium text-primary-foreground"
          >
            Done <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
