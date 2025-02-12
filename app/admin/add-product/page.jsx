// app/admin/add-product/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Opsional: Buat file utilitas (misalnya, utils/api.js) dan import API_URL dari sana.
// Jika belum ada, kita bisa langsung mendefinisikannya di sini.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Menyimpan file gambar

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Buat FormData dan lampirkan data produk
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    // Ambil token dari localStorage (jika endpoint dilindungi)
    const token = localStorage.getItem('token');

    try {
      // Gunakan API_URL dari variabel lingkungan agar konsisten di seluruh aplikasi
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          // Jangan set 'Content-Type' secara manual saat menggunakan FormData
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const errorData = await res.json();
        console.error('Failed to add product:', errorData);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
          accept="image/*"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
