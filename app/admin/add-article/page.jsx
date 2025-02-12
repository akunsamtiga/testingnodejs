// app/admin/add-article/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('published', published);
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    try {
      const res = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to add article');
        return;
      }
      router.push('/admin');
    } catch (err) {
      setError('Error adding article');
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Article</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2 rounded"
          rows={6}
        ></textarea>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div>
          <label className="mr-2">Published:</label>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
        <input
          type="file"
          onChange={(e) => setFeaturedImage(e.target.files[0])}
          accept="image/*"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          Add Article
        </button>
      </form>
    </div>
  );
}
