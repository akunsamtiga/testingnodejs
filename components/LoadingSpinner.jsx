// app/components/LoadingSpinner.jsx
'use client';
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
