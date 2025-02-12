// app/components/CategoryDropdown.jsx
"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CategoryDropdown({ categories, onLinkClick, isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleMouseEnter = () => {
    if (!isMobile) setIsOpen(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Button for "Kategori" */}
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="category-dropdown"
        onClick={isMobile ? toggleDropdown : undefined}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-medium font-medium transition-colors ${
          isMobile
            ? "text-[var(--color-muted)] hover:text-[var(--color-mobile-accent)]"
            : "text-[var(--color-maintext)] hover:text-[var(--color-accent)]"
        }`}
      >
        Kategori
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div id="category-dropdown" className="absolute top-full left-0 bg-gray-800 rounded-md shadow-lg z-50">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => {
                onLinkClick(`Kategori: ${category.name}${isMobile ? " (Mobile)" : ""}`);
              }}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}