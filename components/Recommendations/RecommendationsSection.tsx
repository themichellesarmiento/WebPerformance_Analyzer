import { useState } from "react";
import { Recommendations } from "@/types/report";
import EmptyState from "./EmptyState";
import RecommendationRow from "./RecommendationRow";

type Props = {
  recommendations: Recommendations;
};

const tabs = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "seo", label: "SEO" },
  { key: "bestPractices", label: "Best practices" },
] as const;

type TabKey = typeof tabs[number]["key"];

const RecommendationsSection = ({ recommendations }: Props) => {
  const [activeTab, setActiveTab] = useState<TabKey>("performance");

  const items = recommendations[activeTab];

  return (
    <section aria-label="Recommendations">
    <h2 className='my-3 text-xs md:text-lg font-medium uppercase tracking-widest text-text-primary'>Recommendations</h2>

      <div className="rounded-xl border border-text-primary bg-background">

        <div className="flex flex-wrap gap-1 border-b border-zinc-100 p-4">
          {tabs.map((tab) => {
            const count = recommendations[tab.key].length;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-2xl transition-colors ${isActive
                  ? "bg-text-secondary font-medium text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className={` px-1.5 py-0.5 text-xl font-medium ${isActive
                    ? "bg-text-secondary font-medium text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                    }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="divide-y divide-zinc-300">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            items.map((item) => (
              <RecommendationRow key={item.id} item={item} />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

export default RecommendationsSection;