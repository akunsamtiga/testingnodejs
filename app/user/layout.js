// app/user/layout.js
'use client';
import Link from 'next/link';

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">User Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/user">Dashboard</Link>
              </li>
              <li>
                <Link href="/user/orders">Orders</Link>
              </li>
              <li>
                <Link href="/user/settings">Settings</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 text-center p-4">
        &copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.
      </footer>
    </div>
  );
}
