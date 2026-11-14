"use client";

import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import posthog from "posthog-js";
import OcaBlueprint from "./OcaBlueprint";
import { whatsappUrl, defaultWhatsappMessage } from "../data/site";

const materials = [
  "IA & Agentes",
  "React Native",
  "Next.js",
  "TypeScript",
  "OpenAI",
  "Claude",
  "Supabase",
  "Node.js",
  "Automações",
  "Expo",
  "PostgreSQL",
  "Python",
  "Pagar.me",
];

// Entrance runs in CSS so the headline paints without waiting for JavaScript
const enterDelay = (index: number) => ({
  animationDelay: `${0.1 + index * 0.12}s`,
});

const Hero = () => {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pt-16">
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="hero-enter annotation mb-6" style={enterDelay(0)}>
            Software house · São Paulo, BR
          </p>

          <h1
            className="hero-enter font-display text-4xl font-semibold leading-[1.05] tracking-tight text-areia sm:text-6xl lg:text-7xl"
            style={enterDelay(1)}
          >
            Construímos o produto que a sua{" "}
            <span className="text-urucum">ideia</span> merece.
          </h1>

          <p
            className="hero-enter mt-7 max-w-xl text-lg leading-relaxed text-palha sm:text-xl"
            style={enterDelay(2)}
          >
            Aplicativos, sistemas e produtos com IA, feitos por quem já lançou
            os próprios: mais de 40 mil pessoas usam o que a gente construiu.
            Você traz a ideia, a OCA levanta a estrutura.
          </p>

          <div
            className="hero-enter mt-10 flex flex-col gap-4 sm:flex-row"
            style={enterDelay(3)}
          >
            <a
              href={whatsappUrl(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("whatsapp_cta_clicked", { placement: "hero" })
              }
              className="btn-primary"
            >
              Iniciar projeto
              <FiArrowUpRight />
            </a>
            <Link href="/projetos" className="btn-secondary">
              Ver projetos
              <FiArrowRight />
            </Link>
          </div>

          <p className="hero-enter annotation mt-12" style={enterDelay(4)}>
            +40 mil usuários nos nossos produtos · Checkout com 90% de
            conversão · IA no processo e no produto
          </p>
        </div>

        <div className="mx-auto hidden aspect-square w-full max-w-md lg:block">
          <OcaBlueprint />
        </div>
      </div>

      {/* Materials legend */}
      <div className="border-t border-fresta">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <span className="annotation shrink-0 text-urucum">Materiais /</span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee flex w-max">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="annotation flex shrink-0 items-center"
                >
                  {materials.map((tech) => (
                    <li key={tech} className="flex items-center">
                      <span className="whitespace-nowrap">{tech}</span>
                      <span className="mx-5 text-fresta">·</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
