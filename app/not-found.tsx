"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Define o tamanho da janela após renderização
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calcular deslocamento baseado na posição do mouse
  const calcMovement = (axis: "x" | "y", intensity = 1) => {
    if (!isMounted) return 0;

    const center = axis === "x" ? windowSize.width / 2 : windowSize.height / 2;
    const position = axis === "x" ? mousePosition.x : mousePosition.y;
    return ((position - center) / (center || 1)) * intensity;
  };

  // Variantes para o número 404
  const number404Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o círculo decorativo
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o texto
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o botão
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.7,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Círculos decorativos no fundo */}
      {isMounted && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-30"
            animate={{
              x: calcMovement("x", 20),
              y: calcMovement("y", 20),
            }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-purple-100 dark:bg-purple-900/20 blur-2xl opacity-20 top-1/4 -right-20"
            animate={{
              x: calcMovement("x", -15),
              y: calcMovement("y", -15),
            }}
            transition={{ type: "spring", stiffness: 40 }}
          />
        </>
      )}

      <motion.div
        className="z-10 mb-8 flex items-center justify-center"
        variants={number404Variants}
        initial="hidden"
        animate="visible"
      >
        <span className="text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          4
        </span>
        <motion.div
          className="relative w-36 h-36 mx-2"
          variants={circleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-70"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              0
            </span>
          </motion.div>
        </motion.div>
        <span className="text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          4
        </span>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Ops! Parece que você se perdeu no espaço digital.
      </motion.h2>

      <motion.p
        className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        A página que você está procurando pode ter sido movida, excluída ou
        talvez nunca tenha existido.
      </motion.p>

      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Link href="/" className="block cursor-pointer">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center space-x-2 cursor-pointer">
            <span>Voltar para Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </motion.div>

      {/* Animação de estrelas/partículas */}
      {isMounted && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                opacity: [
                  Math.random() * 0.5 + 0.3,
                  Math.random() * 0.8 + 0.5,
                  Math.random() * 0.5 + 0.3,
                ],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
