"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import OcaMark from "./OcaMark";
import { whatsappUrl, defaultWhatsappMessage } from "../data/site";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projetos", path: "/projetos" },
  { name: "Sobre", path: "/sobre" },
  { name: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? "border-fresta bg-terra/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5"
          aria-label="OCA Software House - Home"
        >
          <OcaMark className="h-8 w-8 text-areia" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-wide text-areia">
              OCA
            </span>
            <span className="annotation text-[0.55rem] tracking-[0.22em]">
              Software House
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`relative px-3 py-2 text-sm transition-colors hover:text-areia ${
                    currentPath === item.path ? "text-areia" : "text-palha"
                  }`}
                >
                  {item.name}
                  {currentPath === item.path && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-urucum"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Iniciar projeto
            <FiArrowUpRight />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-md p-3 text-areia transition-colors hover:bg-carvao md:hidden"
        >
          {mobileMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-fresta bg-terra/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-4 py-5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={`block rounded-md px-4 py-3 transition-colors hover:bg-carvao ${
                      currentPath === item.path
                        ? "text-urucum"
                        : "text-areia"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="btn-primary w-full"
                >
                  Iniciar projeto
                  <FiArrowUpRight />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
