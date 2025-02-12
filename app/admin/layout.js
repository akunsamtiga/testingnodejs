// app/admin/layout.js
export default function AdminLayout({ children }) {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Admin Dashboard
      </footer>
    </div>
  );
}
