// src/app/(auth)/login/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Pastikan import default

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Login gagal, periksa kredensial Anda.');
        return;
      }
      
      localStorage.setItem('token', data.accessToken);
      const decoded = jwtDecode(data.accessToken);
            
      // Arahkan ke halaman admin atau user berdasarkan role
      if (decoded.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan, silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sedang login...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
