import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Contoh sederhana; integrasikan logika autentikasi sebenarnya
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'user@example.com' });
    }
  }, []);

  return { user };
}
