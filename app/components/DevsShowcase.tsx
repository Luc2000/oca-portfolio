"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import DevCard from "./DevCard";
import type { PartnerDev } from "../lib/devs";
import { useShuffled } from "../lib/use-shuffled";

interface DevsShowcaseProps {
  devs: PartnerDev[];
  source: string;
}

// Above this count the desktop grid turns into a carousel; mobile always scrolls past one card
const CAROUSEL_MIN = 4;

const scrollTrackClass =
  "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const arrowClass =
  "flex h-9 w-9 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia";

const DevsShowcase = ({ devs, source }: DevsShowcaseProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const ordered = useShuffled(devs);

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
    ? "w-[70%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
    : `${devs.length === 1 ? "w-full" : "w-[70%]"} shrink-0 snap-start sm:w-auto`;

  return (
    <div>
      <div ref={trackRef} className={trackClass}>
        {/* Index keys on purpose: the post-hydration shuffle must swap card contents,
            not move DOM nodes, or the snap container re-snaps to wherever the
            first card ended up */}
        {ordered.map((dev, index) => (
          <div key={index} className={itemClass}>
            <DevCard dev={dev} source={source} />
          </div>
        ))}
      </div>

      {isCarousel ? (
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Devs anteriores"
            className={arrowClass}
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Próximos devs"
            className={arrowClass}
          >
            <FiArrowRight />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DevsShowcase;
