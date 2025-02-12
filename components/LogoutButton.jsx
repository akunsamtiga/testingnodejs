// app/components/LogoutButton.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    // Arahkan ke halaman login
    router.push('/login');
    // Lakukan reload setelah sedikit delay agar push selesai
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
