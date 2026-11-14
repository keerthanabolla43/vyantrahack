import { Volume2, VolumeX } from 'lucide-react';

const DOT = {
  good: 'bg-emerald-400',
  warn: 'bg-amber-400',
  bad: 'bg-orange-500',
};

export default function LiveHud({ hud, voiceOn, onToggleVoice, onFinish }) {
  const hint = hud.cue || (hud.poseId ? 'Holding well — keep breathing.' : 'Step back so your whole body is in frame.');

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5 safe-bottom">
      <div className="rounded-[28px] border border-white/10 bg-[#0C1411]/90 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
              {hud.poseId ? `Holding ${Math.floor(hud.holdSec)}s` : 'Searching'}
            </p>
            <h2 className="mt-1 truncate font-display text-[26px] leading-tight text-white">
              {hud.name || 'Find your pose'}
            </h2>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[42px] leading-none text-white">{hud.score ?? '–'}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">alignment</p>
          </div>
        </div>

        {hud.joints.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {hud.joints.map((joint) => (
              <span
                key={joint.id}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/75"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[joint.status] || 'bg-white/40'}`} />
                {joint.label} {joint.score}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex min-h-[46px] items-center rounded-2xl bg-white/10 px-3.5 py-2.5">
          <p className="text-[13px] leading-snug text-white">{hint}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={voiceOn ? 'Mute spoken cues' : 'Unmute spoken cues'}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 text-white/80"
          >
            {voiceOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="flex-1 rounded-2xl bg-white py-3 text-sm font-semibold text-[#0C1411] transition-transform active:scale-[0.99]"
          >
            Finish session
          </button>
        </div>
      </div>
    </div>
  );
}
