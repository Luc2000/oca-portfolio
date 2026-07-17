"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// The zero of "404" is the oca door circle that rolled off the blueprint
const RollingZero = () => {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className="inline-flex items-center justify-center"
      initial={reduced ? false : { x: -160, rotate: -360, opacity: 0 }}
      animate={{ x: 0, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 120 120"
        className="h-[0.72em] w-[0.72em]"
        fill="none"
        animate={reduced ? undefined : { rotate: [0, 6, -6, 0] }}
        transition={{ delay: 2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle
          cx="60"
          cy="60"
          r="44"
          stroke="var(--color-urucum)"
          strokeWidth="14"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="7"
          fill="var(--color-urucum)"
          animate={reduced ? { opacity: 0.9 } : { opacity: [0.3, 0.9, 0.3] }}
          transition={
            reduced ? undefined : { delay: 1.4, duration: 2.4, repeat: Infinity }
          }
        />
      </motion.svg>
    </motion.span>
  );
};

export default function NotFound() {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center">
      {/* Construction guides */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: 0.2 }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-px [background:repeating-linear-gradient(to_right,var(--color-fresta)_0_10px,transparent_10px_24px)]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px [background:repeating-linear-gradient(to_bottom,var(--color-fresta)_0_10px,transparent_10px_24px)]" />
      </motion.div>

      <div className="relative">
        <motion.p
          className="annotation"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Erro 404 / fora da planta
        </motion.p>

        <motion.h1
          className="font-display mt-6 flex items-center justify-center gap-[0.06em] text-[7rem] font-bold leading-none tracking-tight text-areia sm:text-[10rem]"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span>4</span>
          <RollingZero />
          <span>4</span>
        </motion.h1>

        {/* Dimension line */}
        <motion.div
          aria-hidden="true"
          className="mx-auto mt-4 max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 1.1 }}
        >
          <div className="relative h-px bg-palha">
            <span className="absolute left-0 -top-[6px] h-[13px] w-px bg-palha" />
            <span className="absolute right-0 -top-[6px] h-[13px] w-px bg-palha" />
          </div>
          <p className="annotation mt-3 text-[0.6rem]">Coordenada inexistente</p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.9 }}
        >
          <h2 className="font-display mx-auto mt-10 max-w-lg text-2xl font-semibold tracking-tight text-areia sm:text-3xl">
            Esta página não está no projeto
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-palha">
            O endereço pode ter sido movido, removido ou talvez nunca tenha
            saído da prancheta.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/" className="btn-primary">
              <FiArrowLeft />
              Voltar para a home
            </Link>
            <Link href="/projetos" className="btn-secondary">
              Ver projetos
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
