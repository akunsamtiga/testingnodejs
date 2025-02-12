// app/product/[id]/page.jsx
'use client';
import { useState, useEffect } from 'react';
import ReviewList from '../../../components/ReviewList';

// Definisikan API_URL secara konsisten dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProductDetail({ params }) {
  // Gunakan params.id dari props
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Ambil detail produk dan review terkait
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch detail produk
        const resProd = await fetch(`${API_URL}/api/products/${id}`);
        if (!resProd.ok) {
          throw new Error('Failed to fetch product');
        }
        const dataProd = await resProd.json();
        setProduct(dataProd);

        // Fetch review produk
        const resRev = await fetch(`${API_URL}/api/reviews/product/${id}`);
        if (!resRev.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const dataRev = await resRev.json();
        setReviews(dataRev);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  // Handler untuk submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment, productId: id }),
      });
      if (res.ok) {
        // Refresh review list setelah submit berhasil
        const updatedReviews = await fetch(`${API_URL}/api/reviews/product/${id}`).then((r) => r.json());
        setReviews(updatedReviews);
        setRating(5);
        setComment('');
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Handler untuk menambahkan produk ke wishlist
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      if (res.ok) {
        alert('Product added to wishlist');
      } else {
        alert('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // Jika data produk belum tersedia, tampilkan loading
  if (!product) return <p>Loading...</p>;

  // Helper function untuk menghasilkan URL gambar absolut
  const getImageSrc = (image) => {
    if (!image) return '';
    return `${API_URL}${image.startsWith('/') ? image : '/' + image}`;
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      
      {/* Tampilkan gambar produk jika ada */}
      {product.image ? (
        <img
          src={getImageSrc(product.image)}
          alt={product.title}
          crossOrigin="anonymous"
          className="w-full max-h-96 object-cover"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}
      
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 font-semibold">Rp {product.price.toLocaleString('id-ID')}</p>
      <p className="mt-2">Category: {product.category}</p>

      <button
        onClick={handleAddToWishlist}
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        Add to Wishlist
      </button>

      {/* Formulir untuk menambahkan review */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Rating (1-5):</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <textarea
            placeholder="Your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </form>
      </div>

      {/* Tampilkan daftar review */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
