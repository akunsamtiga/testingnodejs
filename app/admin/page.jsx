// app/admin/dashboard/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from '../../components/LogoutButton';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Tambahkan state "mounted" untuk menunda render hingga klien siap (mengatasi hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // State untuk dashboard
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [pendingReviews, setPendingReviews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk manajemen hero image
  const [heroImages, setHeroImages] = useState([]);
  const [selectedHeroFile, setSelectedHeroFile] = useState(null);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [heroError, setHeroError] = useState('');

  useEffect(() => {
    fetchDashboard();
    fetchHeroImages();
    fetchArticles();
  }, []);

  // Fungsi untuk mengambil data dashboard: produk, statistik, pending reviews
  async function fetchDashboard() {
    const token = localStorage.getItem('token');
    try {
      // Fetch produk
      const resProducts = await fetch(`${API_URL}/api/products`);
      if (resProducts.ok) {
        const dataProducts = await resProducts.json();
        setProducts(dataProducts);
      } else {
        console.error('Failed to fetch products');
      }
      // Fetch statistik dashboard
      const resStats = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resStats.ok) {
        const dataStats = await resStats.json();
        setStats(dataStats);
      } else {
        console.error('Failed to fetch dashboard stats');
      }
      // Fetch pending reviews
      const resReviews = await fetch(`${API_URL}/api/reviews?status=pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resReviews.ok) {
        const dataReviews = await resReviews.json();
        setPendingReviews(dataReviews);
      } else {
        console.error('Failed to fetch pending reviews');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Fungsi untuk mengambil daftar hero images
  async function fetchHeroImages() {
    try {
      const res = await fetch(`${API_URL}/api/hero-images`);
      if (res.ok) {
        const data = await res.json();
        setHeroImages(data);
      } else {
        console.error('Failed to fetch hero images');
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    }
  }

  // Fungsi untuk mengambil artikel
  async function fetchArticles() {
    try {
      const res = await fetch(`${API_URL}/api/articles`);
      if (res.ok) {
        const data = await res.json();
        // Asumsikan API mengembalikan data sebagai { articles: [...] } atau langsung array
        setArticles(data.articles || data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  // Fungsi untuk menghapus produk
  async function handleDelete(productId) {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/admin/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchDashboard();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  // Fungsi untuk menghapus artikel
  async function handleDeleteArticle(articleId) {
    const confirmed = window.confirm('Are you sure you want to delete this article?');
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_URL}/api/articles/${articleId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchArticles();
      } else {
        console.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  // Fungsi untuk moderasi review (approve/reject)
  async function handleModerateReview(reviewId, newStatus) {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchDashboard();
      } else {
        console.error('Failed to moderate review');
      }
    } catch (error) {
      console.error('Error moderating review:', error);
    }
  }

  // Fungsi untuk mengupload hero image
  async function handleHeroUpload(e) {
    e.preventDefault();
    if (!selectedHeroFile) return;
    setUploadingHero(true);
    setHeroError('');
    const formData = new FormData();
    formData.append('heroImage', selectedHeroFile);
    try {
      const res = await fetch(`${API_URL}/api/hero-images`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setHeroError(data.message || 'Upload failed');
      } else {
        await fetchHeroImages();
      }
    } catch (error) {
      console.error(error);
      setHeroError('Upload failed');
    } finally {
      setUploadingHero(false);
      setSelectedHeroFile(null);
    }
  }

  // Fungsi untuk menghapus hero image
  async function handleDeleteHeroImage(id) {
    const confirmed = window.confirm('Are you sure you want to delete this hero image?');
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_URL}/api/hero-images/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchHeroImages();
      } else {
        console.error('Failed to delete hero image');
      }
    } catch (error) {
      console.error('Error deleting hero image:', error);
    }
  }

  // Jika komponen belum mounted (untuk menghindari hydration mismatch), jangan render
  if (!mounted) return null;

  if (loading) return <p>Loading dashboard data...</p>;

  return (
    <div className="p-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/admin/add-product')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Product
          </button>
          <button 
            onClick={() => router.push('/admin/add-article')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Article
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* Statistik Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-3xl">{stats.userCount || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-3xl">{stats.productCount || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <p className="text-3xl">{stats.reviewCount || 0}</p>
        </div>
      </div>

      {/* Hero Images Management Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Manage Hero Images</h2>
        {/* Form Upload */}
        <form onSubmit={handleHeroUpload} className="mb-6">
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setSelectedHeroFile(e.target.files[0])}
            className="mb-2"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={uploadingHero}
          >
            {uploadingHero ? 'Uploading...' : 'Upload Hero Image'}
          </button>
          {heroError && <p className="text-red-500 mt-2">{heroError}</p>}
        </form>
        {/* List Hero Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heroImages.map((hero) => (
            <div key={hero.id} className="border p-4 rounded flex items-center">
              <div className="w-32 h-20 relative">
                <Image 
                  src={API_URL + hero.imageUrl}
                  alt="Hero Image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Uploaded at: {new Date(hero.createdAt).toLocaleString()}
                </p>
                <button 
                  onClick={() => handleDeleteHeroImage(hero.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Reviews Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Pending Reviews</h2>
        {pendingReviews.length === 0 ? (
          <p>No pending reviews.</p>
        ) : (
          <ul className="space-y-4">
            {pendingReviews.map(review => (
              <li key={review.id} className="border p-4 rounded">
                <p className="font-semibold">Product: {review.product.title}</p>
                <p>Rating: {review.rating} / 5</p>
                <p>{review.comment}</p>
                <p className="text-xs text-gray-500">Status: {review.status}</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => handleModerateReview(review.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleModerateReview(review.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod.id} className="text-center">
                    <td className="px-4 py-2 border">{prod.id}</td>
                    <td className="px-4 py-2 border">{prod.title}</td>
                    <td className="px-4 py-2 border">{prod.price}</td>
                    <td className="px-4 py-2 border">{prod.category}</td>
                    <td className="px-4 py-2 border">
                      <button 
                        onClick={() => router.push(`/admin/edit-product/${prod.id}`)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Articles Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Articles</h2>
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Author</th>
                  <th className="px-4 py-2 border">Published</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="text-center">
                    <td className="px-4 py-2 border">{article.id}</td>
                    <td className="px-4 py-2 border">{article.title}</td>
                    <td className="px-4 py-2 border">{article.author || 'Unknown'}</td>
                    <td className="px-4 py-2 border">{article.published ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2 border">
                      <button 
                        onClick={() => router.push(`/admin/edit-article/${article.id}`)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteArticle(article.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
