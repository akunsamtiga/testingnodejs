// app/components/ProductCard.jsx
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      <img src={product.image || '/placeholder.png'} alt={product.title || 'Product Image'} className="w-full h-48 object-cover rounded-md" />
      <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
      <p className="mt-2 text-gray-600">Rp {product.price}</p>
      <Link href={`/product/${product.id}`}>
        <span className="mt-4 inline-block text-blue-500">Lihat Detail</span>
      </Link>
    </div>
  );
}
