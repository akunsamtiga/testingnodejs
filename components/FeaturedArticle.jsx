// app/components/FeaturedArticle.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FeaturedArticle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedArticles() {
      try {
        // Ambil 3 artikel terbaru berdasarkan tanggal pembuatan
        const res = await fetch(`${API_URL}/api/articles?limit=3&sortBy=createdAt&order=desc`);
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await res.json();
        setArticles(data.articles || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 bg-gray-5 rounded-xl shadow-md">
        <p className="text-lg text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center m-5 h-40 bg-gray-5 rounded-xl shadow-md">
        <p className="text-xl font-medium text-gray-600">
          Artikel belum tersedia
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-[var(--color-muted)]">
            Stay updated with the latest trends, tips, and product reviews.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              {article.featuredImage ? (
                <Image
                  src={
                    article.featuredImage.startsWith('/')
                      ? `${API_URL}${article.featuredImage}`
                      : article.featuredImage
                  }
                  alt={article.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  {article.content.substring(0, 100)}...
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-semibold transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/articles"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-[var(--color-surface)] font-semibold py-3 px-6 rounded-md transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
