// app/page.js
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import ProductSearch from "../components/ProductSearch";
import HeroImage from "../components/HeroImage";
import FeaturedProduct from "../components/FeaturedProduct";
import FeaturedArticle from "../components/FeaturedArticle";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          // Menampilkan 6 produk unggulan
          setProducts(data.slice(0, 6));
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [API_URL]);

  return (
    <div id="main-content">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-surface)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Welcome to E-Commerce App
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[var(--color-surface)] mb-6">
              Discover the best deals on smartphones, laptops, and accessories.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-[var(--color-surface)] font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <HeroImage/>
          </div>
        </div>
      </section>

      <FeaturedProduct />
      {/* Product Search Component */}
      <ProductSearch />

      {/* Articles Section */}
      <FeaturedArticle />
                {/* Banner Section */}
                <section className="relative bg-gray-900 text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/bg1iphone.jpg" // Replace with your image path
                  alt="Banner Image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="opacity-50"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Ini Banner Ygy!
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Discover the latest gadgets and accessories to elevate your lifestyle.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-sm md:text-lg mb-8">
            Explore our wide range of products and find the perfect fit for you.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
            {/* Testimonials Section */}
            <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">John Doe</h4>
                  <p className="text-xs md:text-sm text-gray-400">Verified Buyer</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-300">
                "Great experience! The product arrived on time and exceeded my expectations."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">Jane Smith</h4>
                  <p className="text-xs md:text-sm text-gray-400">Verified Buyer</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-300">
                "The customer service was excellent, and the product quality is top-notch."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
