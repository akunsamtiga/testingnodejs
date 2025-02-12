// app/components/ProductSearch.jsx
'use client';
import { useState } from 'react';

export default function ProductSearch() {
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    order: 'asc',
  });
  const [products, setProducts] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (showFilter) {
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.order) params.append('order', filters.order);
    }
    try {
      const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setSearchInitiated(true);
  };

  const handleResetFilters = () => {
    setShowFilter(false);
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: '',
      order: 'asc',
    });
    setProducts([]);
    setSearchInitiated(false);
    setSearch('');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input 
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-lg transition"
          aria-expanded={showFilter}
          aria-controls="filter-panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-4.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
        <button 
          type="submit"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {showFilter && (
        <div id="filter-panel" className="mt-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. Electronics"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input 
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Min"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input 
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="sm:col-span-2 flex space-x-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="price">Price</option>
                  <option value="createdAt">Date</option>
                </select>
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <select 
                  value={filters.order}
                  onChange={(e) => setFilters({ ...filters, order: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button 
              type="button"
              onClick={handleResetFilters}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Close Filter
            </button>
            <button 
              type="submit"
              onClick={handleSearchSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {searchInitiated && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Hasil pencarian</h2>
          {products.length === 0 ? (
            <p className="text-gray-600">Produk tidak ditemukan.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[calc(100%/3)] md:auto-cols-[calc(100%/4)] gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border p-4 rounded hover:shadow-lg transition min-w-[calc(100%/3)] md:min-w-[calc(100%/4)]">
                    {product.image && (
                      <img 
                        crossOrigin="anonymous"
                        src={`${API_URL}${product.image}`} 
                        alt={product.title}
                        className="w-full h-48 object-cover rounded mb-4"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-gray-700">Harga: Rp {product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
