"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import posthog from "posthog-js";
import { devLocation, type PartnerDev } from "../lib/devs";

interface DevCardProps {
  dev: PartnerDev;
  source: string;
}

// Photo-led tile: grayscale evens out photos of varying quality, color on hover
const DevCard = ({ dev, source }: DevCardProps) => {
  const meta = [devLocation(dev), dev.price_label].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/devs/${dev.slug}`}
      onClick={() =>
        posthog.capture("dev_profile_opened", { dev_slug: dev.slug, source })
      }
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg border border-fresta bg-carvao">
        <Image
          src={dev.photo_url}
          alt={`Foto de ${dev.name}`}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
        />
        <span
          className={`annotation absolute left-3 top-3 rounded border bg-terra/80 px-2 py-1 text-[0.6rem] backdrop-blur-sm ${
            dev.available ? "border-urucum/60 text-urucum" : "border-fresta"
          }`}
        >
          {dev.available ? "Disponível" : "Ocupado"}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold text-areia">
            {dev.name}
          </h3>
          <p className="mt-1 text-palha">{dev.headline}</p>
        </div>
        <FiArrowUpRight className="mt-1.5 shrink-0 text-palha transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-urucum" />
      </div>

      {meta ? (
        <p className="annotation mt-3 text-[0.7rem] normal-case tracking-normal">
          {meta}
        </p>
      ) : null}
      {dev.stack.length > 0 ? (
        <p className="annotation mt-2 text-[0.65rem]">
          {dev.stack.slice(0, 4).join(" · ")}
        </p>
      ) : null}
    </Link>
  );
};

export default DevCard;
