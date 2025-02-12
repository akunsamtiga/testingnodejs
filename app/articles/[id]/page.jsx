'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Kita gunakan mounted untuk menentukan apakah komponen sudah dimount, 
  // tetapi jangan return null. Gunakan placeholder container agar hook tetap terpanggil.
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${API_URL}/api/articles/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await res.json();
        setArticle(data);
        // Gunakan fallback string kosong jika belum mounted
        setFormattedDate(
          mounted && data.createdAt
            ? new Date(data.createdAt).toLocaleDateString('id-ID')
            : ''
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchArticle();
  }, [id, mounted]);

  // Jangan return null; jika belum mounted, tampilkan placeholder yang tak terlihat
  if (!mounted) {
    return <div className="invisible">Loading...</div>;
  }

  if (loading) return <p>Loading article...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="mb-4">{article.content}</p>
      {article.featuredImage && (
        <img
          src={
            article.featuredImage.startsWith('/')
              ? `${API_URL}${article.featuredImage}`
              : article.featuredImage
          }
          alt={article.title}
          className="w-full h-auto rounded mb-4"
          loading="lazy"
        />
      )}
      <p className="text-sm text-gray-500">
        Author: {article.author || 'Unknown'}
      </p>
      <p className="text-sm text-gray-500">
        Published: {article.published ? 'Yes' : 'No'}
      </p>
      <p className="text-sm text-gray-500">
        Created: {formattedDate || 'N/A'}
      </p>
      <div className="mt-4">
        <Link
          href="/articles"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Articles
        </Link>
      </div>
    </div>
  );
}
