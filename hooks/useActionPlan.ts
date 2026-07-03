import { useState } from "react";
import { Recommendation } from "@/types/report";

export type ActionPlanItem = {
  title: string;
  effort: "low" | "medium" | "high";
  description: string;
  estimatedSaving: string;
};

type Status = "idle" | "loading" | "done" | "error";

type UseActionPlanReturn = {
  plan: ActionPlanItem[];
  status: Status;
  error: string | null;
  generate: () => Promise<void>;
  reset: () => void;
};

type Params = {
  url: string;
  score: number;
  recommendations: Recommendation[];
};

export function useActionPlan({ url, score, recommendations }: Params): UseActionPlanReturn {
  const [plan, setPlan] = useState<ActionPlanItem[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/actionPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, score, recommendations }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setPlan(data.plan);
      setStatus("done");
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  }

  function reset() {
    setPlan([]);
    setStatus("idle");
    setError(null);
  }

  return { plan, status, error, generate, reset };
}