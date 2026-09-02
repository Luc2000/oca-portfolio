"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import posthog from "posthog-js";
import { devLocation, type PartnerDev } from "../lib/devs";

interface DevCardProps {
  dev: PartnerDev;
  source: string;
}

const DevCard = ({ dev, source }: DevCardProps) => {
  const location = devLocation(dev);

  return (
    <Link
      href={`/devs/${dev.slug}`}
      onClick={() =>
        posthog.capture("dev_profile_opened", { dev_slug: dev.slug, source })
      }
      className="group flex h-full flex-col rounded-lg border border-fresta bg-carvao p-6 transition-colors hover:border-palha"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-fresta">
          <Image
            src={dev.photo_url}
            alt={`Foto de ${dev.name}`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl font-semibold text-areia">
            {dev.name}
          </h3>
          <p className="mt-0.5 text-sm text-palha">{dev.headline}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-palha">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${dev.available ? "bg-emerald-400" : "bg-palha"}`}
          />
          {dev.available ? "Disponível" : "Ocupado"}
        </span>
        {location ? (
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin />
            {location}
          </span>
        ) : null}
      </div>

      {dev.stack.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {dev.stack.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="annotation rounded border border-fresta px-2.5 py-1 text-[0.65rem]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="text-sm text-palha">{dev.price_label}</span>
        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-urucum">
          Ver perfil
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default DevCard;
