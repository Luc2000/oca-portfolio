"use client";

import { useState } from "react";
import DevCard from "./DevCard";
import type { PartnerDev } from "../lib/devs";
import { useShuffled } from "../lib/use-shuffled";

const MAX_FILTERS = 12;

function topStacks(devs: PartnerDev[]): string[] {
  const counts = new Map<string, number>();
  for (const dev of devs) {
    for (const tag of dev.stack) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_FILTERS)
    .map(([tag]) => tag);
}

const filterClass = (active: boolean) =>
  `annotation rounded border px-4 py-2.5 transition-colors ${
    active
      ? "border-urucum text-urucum"
      : "border-fresta hover:border-palha hover:text-areia"
  }`;

const DevsGrid = ({ devs }: { devs: PartnerDev[] }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const ordered = useShuffled(devs);
  const stacks = topStacks(devs);

  const filtered = selected
    ? ordered.filter((dev) => dev.stack.includes(selected))
    : ordered;

  return (
    <div>
      {stacks.length > 1 ? (
        <div
          role="group"
          aria-label="Filtrar devs por stack"
          className="mb-12 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-pressed={selected === null}
            className={filterClass(selected === null)}
          >
            Todos
          </button>
          {stacks.map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => setSelected(stack)}
              aria-pressed={selected === stack}
              className={filterClass(selected === stack)}
            >
              {stack}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dev) => (
          <DevCard key={dev.id} dev={dev} source="devs" />
        ))}
      </div>
    </div>
  );
};

export default DevsGrid;
