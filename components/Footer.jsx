// app/components/Footer.jsx
"use client";
import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] text-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Products Section */}
          <div className="col-span-1">
            <h3 className="text-[var(--color-text)] font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/smartphones" className="hover:text-[var(--color-primary)] transition-colors">Smartphones</Link></li>
              <li><Link href="/laptops" className="hover:text-[var(--color-primary)] transition-colors">Laptops</Link></li>
              <li><Link href="/accessories" className="hover:text-[var(--color-primary)] transition-colors">Accessories</Link></li>
              <li><Link href="/deals" className="hover:text-[var(--color-primary)] transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-[var(--color-text)] font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact Us</Link></li>
              <li><Link href="/warranty" className="hover:text-[var(--color-primary)] transition-colors">Warranty</Link></li>
              <li><Link href="/track-order" className="hover:text-[var(--color-primary)] transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-[var(--color-text)] font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-[var(--color-primary)] transition-colors">Careers</Link></li>
              <li><Link href="/newsroom" className="hover:text-[var(--color-primary)] transition-colors">Newsroom</Link></li>
              <li><Link href="/sustainability" className="hover:text-[var(--color-primary)] transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-1">
            <h3 className="text-[var(--color-text)] font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialIcon url="https://facebook.com" className="hover:opacity-75 transition-opacity" />
              <SocialIcon url="https://twitter.com" className="hover:opacity-75 transition-opacity" />
              <SocialIcon url="https://instagram.com" className="hover:opacity-75 transition-opacity" />
              <SocialIcon url="https://youtube.com" className="hover:opacity-75 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <GlobeAltIcon className="h-5 w-5 text-[var(--color-muted)]" />
            <span className="text-sm">Indonesia/English</span>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-sm hover:text-[var(--color-primary)] transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="text-sm hover:text-[var(--color-primary)] transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-sm hover:text-[var(--color-primary)] transition-colors">Cookie Settings</Link>
          </div>

          <div className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
