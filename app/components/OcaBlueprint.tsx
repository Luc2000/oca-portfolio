"use client";

import { motion, useReducedMotion } from "framer-motion";

// The site's signature: the OCA mark drafted like a blueprint,
// guides first, then the house, then the door lit in urucum
const OcaBlueprint = () => {
  const reduced = useReducedMotion();

  const drawTransition = (delay: number, duration: number) =>
    reduced
      ? { duration: 0 }
      : {
          pathLength: { delay, duration, ease: "easeInOut" as const },
          opacity: { delay, duration: 0.01 },
        };

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Construction guides */}
      <motion.g
        stroke="var(--color-fresta)"
        strokeWidth="1"
        strokeDasharray="6 8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2 }}
      >
        <line x1="100" y1="20" x2="100" y2="380" />
        <line x1="300" y1="20" x2="300" y2="380" />
        <line x1="20" y1="170" x2="380" y2="170" />
        <line x1="20" y1="320" x2="380" y2="320" />
        <line x1="200" y1="20" x2="200" y2="60" />
      </motion.g>

      {/* House outline */}
      <motion.path
        d="M 100 320 L 100 170 L 200 80 L 300 170 L 300 320 Z"
        stroke="var(--color-areia)"
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(0.6, 1.4)}
      />

      {/* Door circle, the fire inside */}
      <motion.circle
        cx="200"
        cy="302"
        r="44"
        stroke="var(--color-urucum)"
        strokeWidth="10"
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(1.8, 0.9)}
      />
      <motion.circle
        cx="200"
        cy="302"
        r="5"
        fill="var(--color-urucum)"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 0.9 } : { opacity: [0.3, 0.9, 0.3] }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 2.7, duration: 2.4, repeat: Infinity }
        }
      />

      {/* Dimension line: the distance from idea to product */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.6 }}
      >
        <g stroke="var(--color-palha)" strokeWidth="1.5">
          <line x1="100" y1="352" x2="177" y2="352" />
          <line x1="223" y1="352" x2="300" y2="352" />
          <line x1="100" y1="346" x2="100" y2="358" />
          <line x1="300" y1="346" x2="300" y2="358" />
        </g>
        <text
          x="200"
          y="356"
          textAnchor="middle"
          fill="var(--color-palha)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="2"
        >
          IDEIA&#8594;PRODUTO
        </text>
      </motion.g>
    </svg>
  );
};

export default OcaBlueprint;
