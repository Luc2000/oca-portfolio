"use client";

import { useRef, useSyncExternalStore } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import DevCard from "./DevCard";
import type { PartnerDev } from "../lib/devs";

interface DevsShowcaseProps {
  devs: PartnerDev[];
  source: string;
}

// Above this count the desktop grid turns into a carousel; mobile always scrolls past one card
const CAROUSEL_MIN = 4;

const subscribe = () => () => {};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const scrollTrackClass =
  "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const DevsShowcase = ({ devs, source }: DevsShowcaseProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const shuffledRef = useRef<PartnerDev[] | null>(null);
  // Server and hydration render the DB order; the client then swaps in a
  // per-visit shuffle without a hydration mismatch
  const ordered = useSyncExternalStore(
    subscribe,
    () => (shuffledRef.current ??= shuffle(devs)),
    () => devs
  );

  const isCarousel = devs.length >= CAROUSEL_MIN;

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  const trackClass = isCarousel
    ? scrollTrackClass
    : `${scrollTrackClass} sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3`;

  const itemClass = isCarousel
    ? "w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
    : `${devs.length === 1 ? "w-full" : "w-[85%]"} shrink-0 snap-start sm:w-auto`;

  return (
    <div>
      <div ref={trackRef} className={trackClass}>
        {ordered.map((dev) => (
          <div key={dev.id} className={itemClass}>
            <DevCard dev={dev} source={source} />
          </div>
        ))}
      </div>

      {isCarousel ? (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Devs anteriores"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia"
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Próximos devs"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia"
          >
            <FiArrowRight />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DevsShowcase;
