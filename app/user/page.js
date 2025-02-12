// app/user/dashboard/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definisikan API_URL menggunakan variabel lingkungan dengan fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function untuk mengonversi path gambar relatif ke URL absolut
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    async function fetchWishlist() {
      try {
        const res = await fetch(`${API_URL}/api/wishlist`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setWishlist(data);
        } else {
          console.error('Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    async function fetchReviews() {
      try {
        const res = await fetch(`${API_URL}/api/users/reviews`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    // Jalankan ketiga fungsi fetch secara paralel dan set loading selesai setelah semuanya selesai
    Promise.all([fetchProfile(), fetchWishlist(), fetchReviews()]).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!profile) return <p>Error loading profile.</p>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Profile Section */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        {profile.profilePicture ? (
          <Image
            src={getImageUrl(profile.profilePicture)}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          {profile.address && <p className="text-gray-600">{profile.address}</p>}
        </div>
        <Link
          href="/user/edit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition self-end"
        >
          Edit Profile
        </Link>
      </section>

      {/* Wishlist Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>No items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="border p-4 rounded flex items-center space-x-4">
                {item.product.image && (
                  <Image
                    src={getImageUrl(item.product.image)}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-gray-600">
                    Rp {Number(item.product.price).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
        {reviews.length === 0 ? (
          <p>You haven't written any reviews.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded">
                <p className="font-semibold">Product: {review.product.title}</p>
                <p>Rating: {review.rating} / 5</p>
                {review.comment && <p>Comment: {review.comment}</p>}
                <p className="text-xs text-gray-500">Status: {review.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
