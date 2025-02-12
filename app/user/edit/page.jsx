// app/user/edit/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Definisikan API_URL dari environment variable dengan fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function untuk mengonversi path gambar relatif ke URL absolut
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return `${API_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [currentProfilePicture, setCurrentProfilePicture] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

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
          setName(data.name);
          setAddress(data.address || '');
          setCurrentProfilePicture(data.profilePicture || '');
          setPreviewImage(data.profilePicture ? getImageUrl(data.profilePicture) : '');
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      // Update data teks (name, address)
      const resProfile = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, address }),
      });
      if (!resProfile.ok) {
        console.error('Failed to update profile text');
      }
      // Update foto profil jika ada file baru
      if (newProfilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);
        const resPicture = await fetch(`${API_URL}/api/users/profile/picture`, {
          method: 'PUT',
          headers: {
            // Jangan set 'Content-Type' saat menggunakan FormData,
            // browser akan mengatur boundary secara otomatis
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!resPicture.ok) {
          console.error('Failed to update profile picture');
        }
      }
      router.push('/user');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto Profil */}
        <div className="flex flex-col items-center">
          {previewImage ? (
            <Image 
              src={previewImage} 
              alt="Profile Picture" 
              width={120} 
              height={120} 
              className="rounded-full" 
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="mt-2" 
          />
        </div>
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Alamat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
          <button 
            type="button"
            onClick={() => router.push('/user')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
