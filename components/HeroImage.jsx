// app/components/heroImage.jsx
'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

export default function HeroImage() {
  const [heroImage, setHeroImage] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchHeroImage() {
      try {
        const res = await fetch(`${API_URL}/api/hero-images`);
        if (!res.ok) throw new Error("Failed to fetch hero image");

        const heroData = await res.json();
        if (heroData.length > 0) {
          setHeroImage(heroData[0]); // Ambil hanya hero image terbaru
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    }

    fetchHeroImage();
  }, [API_URL]);

  return (
    <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] lg:w-[500px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg">
      {heroImage ? (
        <Image
          src={`${API_URL}${heroImage.imageUrl}`}
          alt="Hero Image"
          width={500}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-transparent">
            <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
