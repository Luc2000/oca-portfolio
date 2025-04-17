"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

  // Otimizando o handler de scroll com useCallback para melhorar desempenho
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-200 ${
        scrolled
          ? "py-2 bg-gray-900/95 backdrop-blur-md shadow-md"
          : "py-3 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <Image
              src="/images/full-logo.svg"
              alt="OCA Software House"
              width={180}
              height={90}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:text-blue-400 transition-colors flex items-center h-16 px-2 ${
                    currentPath === item.path ? "font-medium text-blue-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </ul>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto.",
                  "_blank"
                )
              }
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all cursor-pointer"
            >
              Contratar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="p-3 rounded-md hover:bg-gray-800 transition-colors touch-manipulation"
            >
              {mobileMenuOpen ? (
                <FiX className="text-white text-2xl" />
              ) : (
                <FiMenu className="text-white text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Reduzindo atraso na animação */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ height: mobileMenuOpen ? "auto" : "0" }}
      >
        <div className="px-4 py-5 bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block py-3 px-4 text-white hover:bg-gray-800 rounded-md transition-colors ${
                    currentPath === item.path
                      ? "font-medium text-blue-400 bg-gray-800/50"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <button
                onClick={() => {
                  window.open(
                    "https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto.",
                    "_blank"
                  );
                  closeMobileMenu();
                }}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg transition-all w-full cursor-pointer font-medium"
              >
                Contratar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
