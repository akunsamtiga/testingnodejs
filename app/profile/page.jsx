// app/profile/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definisikan API_URL dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/api/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
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
          headers: { 'Authorization': `Bearer ${token}` }
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
          headers: { 'Authorization': `Bearer ${token}` }
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

    fetchProfile();
    fetchWishlist();
    fetchReviews();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  // Helper function untuk menghasilkan URL gambar absolut
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Informasi Pribadi */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
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
          href="/profile/edit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition self-end"
        >
          Edit Profile
        </Link>
      </div>

      {/* Wishlist */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li key={item.id} className="flex items-center border p-4 rounded">
                {item.product.image && (
                  <Image 
                    src={getImageUrl(item.product.image)} 
                    alt={item.product.title} 
                    width={80} 
                    height={80} 
                    className="rounded mr-4" 
                  />
                )}
                <div>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-gray-600">
                    Price: Rp {item.product.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review History */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
        {reviews.length === 0 ? (
          <p>You have not written any reviews.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded">
                <p className="font-semibold">Product: {review.product.title}</p>
                <p>Rating: {review.rating} / 5</p>
                {review.comment && <p>Comment: {review.comment}</p>}
                <p className="text-xs text-gray-500">Status: {review.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
