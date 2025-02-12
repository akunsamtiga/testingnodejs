// src/components/FeaturedProduct.jsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "./LoadingSpinner";

export default function FeaturedProducts() {
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
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hanya tampilkan header jika loading selesai dan terdapat produk */}
        {!loading && products.length > 0 && (
          <h2 className="text-2xl font-bold text-center mb-8">
            Featured Products
          </h2>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-40 bg-gray-5 rounded-lg shadow-md">
            <p className="text-xl font-medium text-gray-600">
              Produk ini belum ada
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Product Image */}
                {product.image ? (
                  <Image
                    src={`${API_URL}${product.image}`}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}
                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-700">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stok tersedia: {product.stock}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating}{" "}
                      {product.reviews && product.reviews.length > 0
                        ? `- ${product.reviews.length} reviews`
                        : ""}
                      )
                    </span>
                  </div>
                  {/* Learn More Button */}
                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
