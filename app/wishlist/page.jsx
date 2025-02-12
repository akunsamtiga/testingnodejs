// app/wishlist/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data);
      }
    }
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem('token');
    const confirmed = window.confirm('Remove this item from wishlist?');
    if (!confirmed) return;
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setWishlist(wishlist.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map(item => (
            <li key={item.id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <p className="font-semibold">{item.product.title}</p>
                <p>Price: Rp {item.product.price}</p>
              </div>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
