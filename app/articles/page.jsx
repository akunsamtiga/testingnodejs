'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${API_URL}/api/articles?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data.articles);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, [search, page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Articles</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="w-full p-2 border rounded mb-4"
      />
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border p-4 rounded">
              <Link
                href={`/articles/${article.id}`}
                className="text-xl font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {article.title}
              </Link>
              <p className="text-gray-600">{article.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(article.createdAt).toLocaleDateString('id-ID')}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-4">
        <Link
          href="/admin/add-article"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add New Article
        </Link>
      </div>
    </div>
  );
}
