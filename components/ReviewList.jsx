// app/components/ReviewList.jsx
'use client';
export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
          </div>
          {review.comment && <p>{review.comment}</p>}
          <p className="text-xs text-gray-500">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
