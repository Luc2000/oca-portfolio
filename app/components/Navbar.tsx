"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/full-logo.svg"
              alt="OCA Software House"
              width={200}
              height={100}
              priority
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:text-blue-400 transition-colors flex items-center h-16 ${
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
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              Contratar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <FiX className="text-white" />
              ) : (
                <FiMenu className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-900 shadow-lg">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block py-2 text-white hover:text-blue-400 transition-colors ${
                    currentPath === item.path ? "font-medium text-blue-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto.",
                    "_blank"
                  )
                }
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity w-full cursor-pointer"
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
