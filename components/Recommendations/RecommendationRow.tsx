'use client'

import { Recommendation } from "@/types/report";
import { useState } from "react";

const RecommendationRow = ({ item }: { item: Recommendation }) => {
  const [expand, setExpand] = useState(false);

  const dot = item.score === null || 0 ? 'bg-accent-two' : item.score < 0.5 ? 'bg-accent-one' : 'bg-accent-three';

  return (
    <div className="px-4 py-3">
      <button onClick={() => setExpand((prev) => !prev)} className="flex w-full items-start gap-3 text-left">
        <span className={`mt-1.5 h-4 w-4 shrink-0 rounded-full ${dot}`} />

        <div className="flex-1 min-w-0">
          <p className="text-xl font-medium text-text-primary">{item.title}</p>
          {item.displayValue && (
            <p className="mt-0.5 text-xl text-text-secondary">{item.displayValue}</p>
          )}
        </div>

        <span className={`mt-0.5 shrink-0 text-text-primary transition-transform ${expand ? "rotate-180" : ""}`}> ▾ </span>
      </button>

      {expand && (
          <p className="mt-2 pl-5 text-xl leading-relaxed text-text-primary mx-auto overflow-hidden">{item.description}</p>
      )}
    </div>
  )
}

export default RecommendationRow;