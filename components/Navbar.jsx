// app/components/Navbar.jsx
"use client";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Transition } from "@headlessui/react";
import {
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import CategoryDropdown from "./CategoryDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // State untuk memastikan bahwa komponen yang bergantung pada data client (seperti theme) hanya dirender setelah mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTimeout = useRef(null);
  const categories = [
    { name: "Aksesoris", href: "/aksesoris" },
    { name: "Elektronik", href: "/elektronik" },
    { name: "Perangkat Rumah", href: "/perangkat-rumah" },
    { name: "Gaming", href: "/gaming" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleLinkClick = useCallback((menuName) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "navbar_click", {
        event_category: "Navigation",
        event_label: menuName,
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-primary)] text-[var(--color-muted)]">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-[var(--color-text)] focus:text-[var(--color-surface)] focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold text-[var(--color-navtitle)] hover:text-[var(--color-primary)] transition-colors"
            onClick={() => handleLinkClick("Logo")}
          >
            E-Commerce App
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/handphone"
            onClick={() => handleLinkClick("Handphone")}
            className={`${
              pathname === "/handphone"
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-maintext)]"
            } hover:text-[var(--color-accent)] px-4 py-2 rounded-md text-md font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] hover:after:w-full after:transition-all`}
          >
            Handphone
          </Link>
          <Link
            href="/laptop"
            onClick={() => handleLinkClick("Laptop")}
            className={`${
              pathname === "/laptop"
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-maintext)]"
            } hover:text-[var(--color-accent)] px-4 py-2 rounded-md text-md font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] hover:after:w-full after:transition-all`}
          >
            Laptop
          </Link>
          {/* Category Dropdown */}
          <CategoryDropdown
            categories={categories}
            onLinkClick={handleLinkClick}
          />
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle (Desktop Only) */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:flex p-1.5 rounded bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
          >
            {mounted && (theme === "light" ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            ))}
          </button>
          {/* Login Button */}
          <Link
            href="/login"
            onClick={() => handleLinkClick("Login")}
            className="p-2 text-[var(--color-maintext)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-border)] transition-colors flex items-center"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Login
          </Link>
          {/* Mobile Menu Button */}
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-maintext)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-iconnavring)] transition-colors md:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden bg-[var(--color-surface)] text-[var(--color-text)] p-4 space-y-4">
          {/* Mobile Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-md bg-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-3 text-[var(--color-muted)]" />
          </div>
          {/* Mobile Links */}
          <Link
            href="/handphone"
            onClick={() => {
              handleLinkClick("Handphone (Mobile)");
              setIsOpen(false);
            }}
            className={`${
              pathname === "/handphone"
                ? "bg-[var(--color-border)] text-[var(--color-text)]"
                : "text-[var(--color-muted)]"
            } block px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--color-border)] transition-colors`}
          >
            Handphone
          </Link>
          <Link
            href="/laptop"
            onClick={() => {
              handleLinkClick("Laptop (Mobile)");
              setIsOpen(false);
            }}
            className={`${
              pathname === "/laptop"
                ? "bg-[var(--color-border)] text-[var(--color-text)]"
                : "text-[var(--color-muted)]"
            } block px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--color-border)] transition-colors`}
          >
            Laptop
          </Link>
          {/* Mobile Categories */}
          <CategoryDropdown
            categories={categories}
            onLinkClick={handleLinkClick}
            isMobile={true}
          />
          {/* Mobile Login */}
          <Link
            href="/login"
            onClick={() => {
              handleLinkClick("Login (Mobile)");
              setIsOpen(false);
            }}
            className="text-[var(--color-muted)] hover:text-[var(--color-text)] px-3 py-2 rounded-md text-base font-medium flex items-center hover:bg-[var(--color-border)] transition-colors"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Login
          </Link>
          {/* Theme Toggle (Mobile Only) */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full p-2 rounded flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
          >
            {mounted && (
              theme === "light" ? (
                <MoonIcon className="w-4 h-4 mr-2" />
              ) : (
                <SunIcon className="w-4 h-4 mr-2" />
              )
            )}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </Transition>
    </header>
  );
}
