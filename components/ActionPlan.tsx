"use client";

import { useActionPlan, type ActionPlanItem } from "@/hooks/useActionPlan";
import type { Recommendation } from "@/types/report";

type Props = {
  url: string;
  score: number;
  recommendations: Recommendation[];
};

const effortStyles = {
  low:    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  medium: "bg-amber-50  text-amber-700  dark:bg-amber-950  dark:text-amber-300",
  high:   "bg-red-50    text-red-700    dark:bg-red-950    dark:text-red-300",
};

const priorityStyles = [
  "bg-red-50    text-red-600    dark:bg-red-950    dark:text-red-400",
  "bg-red-50    text-red-600    dark:bg-red-950    dark:text-red-400",
  "bg-amber-50  text-amber-600  dark:bg-amber-950  dark:text-amber-400",
  "bg-amber-50  text-amber-600  dark:bg-amber-950  dark:text-amber-400",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
];

export default function ActionPlan({ url, score, recommendations }: Props) {
  const { plan, status, error, generate, reset } = useActionPlan({
    url,
    score,
    recommendations,
  });

  return (
    <section aria-label="AI action plan">
      <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
        AI action plan
      </h2>

      <div className="rounded-xl border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900">

        {/* header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 1L6.2 3.8L9 4.5L6.8 6.7L7.4 9.5L5 8L2.6 9.5L3.2 6.7L1 4.5L3.8 3.8L5 1Z" fill="#3b82f6"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Fix plan for {url}
            </span>
          </div>
          <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            AI powered
          </span>
        </div>

        <div className="p-4">

          {/* idle */}
          {status === "idle" && (
            <div className="flex flex-col items-center py-8 text-center">
              <p className="mb-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Get a personalised fix plan
              </p>
              <p className="mb-5 text-xs leading-relaxed text-zinc-400">
                Claude will read your audit results and generate step-by-step
                fixes specific to your Next.js stack.
              </p>
              <button
                onClick={generate}
                className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-zinc-100 dark:text-zinc-900"
              >
                Generate action plan
              </button>
            </div>
          )}

          {/* loading */}
          {status === "loading" && (
            <div className="flex flex-col items-center py-8">
              <div className="mb-3 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-400">Generating your fix plan…</p>
            </div>
          )}

          {/* error */}
          {status === "error" && (
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
              <p className="mb-3 text-sm text-red-700 dark:text-red-300">
                {error ?? "Something went wrong."}
              </p>
              <button
                onClick={reset}
                className="text-xs text-red-500 underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {/* result */}
          {status === "done" && (
            <>
              {/* context bar */}
              <div className="mb-4 flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
                <p className="text-xs text-zinc-500">
                  Based on {recommendations.length} failed audits · Score{" "}
                  <span className="font-medium text-red-500">{score}/100</span>
                </p>
                <button
                  onClick={reset}
                  className="text-xs text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  Regenerate
                </button>
              </div>

              {/* fix list */}
              <div className="flex flex-col gap-3">
                {plan.map((item, index) => (
                  <FixItem key={index} item={item} index={index} />
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-400">
                Estimates are based on Lighthouse audit data. Actual gains depend
                on your server and network conditions.
              </p>
            </>
          )}

        </div>
      </div>
    </section>
  );
}

function FixItem({ item, index }: { item: ActionPlanItem; index: number }) {
  const numStyle = priorityStyles[index] ?? priorityStyles[priorityStyles.length - 1];
  const effortStyle = effortStyles[item.effort];

  return (
    <div className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">

      {/* top row */}
      <div className="mb-2 flex items-start gap-2.5">
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${numStyle}`}>
          {index + 1}
        </span>
        <p className="flex-1 text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-100">
          {item.title}
        </p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${effortStyle}`}>
          {item.effort} effort
        </span>
      </div>

      {/* description — inline code blocks */}
      <p className="pl-[30px] text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        {formatDescription(item.description)}
      </p>

      {/* estimated saving */}
      {item.estimatedSaving && (
        <div className="mt-2 flex items-center gap-1.5 pl-[30px]">
          <span className="text-[11px] text-zinc-400">Estimated saving</span>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {item.estimatedSaving}
          </span>
        </div>
      )}

    </div>
  );
}

// turns `backtick` words into <code> spans
function formatDescription(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}