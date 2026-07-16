"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface MediaGalleryProps {
  images: string[];
  title: string;
  accentColor: string;
  isMobile?: boolean;
}

export default function MediaGallery({
  images,
  title,
  accentColor,
  isMobile = false,
}: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const total = images.length;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % total);
    }
  }, [selectedIndex, total]);

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + total) % total);
    }
  }, [selectedIndex, total]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, goNext, goPrev]);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  if (total === 0) return null;

  const aspectRatioClass = isMobile ? "aspect-[9/16]" : "aspect-[16/9]";

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid grid-cols-2 gap-4 ${total === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer glass-card p-1 group ${
              i === 0 && !isMobile && total > 2 ? 'col-span-2 row-span-2' : ''
            }`}
            onClick={() => setSelectedIndex(i)}
            style={{
              borderColor: 'var(--color-border)',
            }}
          >
            <div className={`relative w-full h-full ${i === 0 && !isMobile && total > 2 ? 'aspect-video' : aspectRatioClass} rounded-xl overflow-hidden`}>
              <Image
                src={img}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              
              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass-btn glass-btn-sm p-3 rounded-full backdrop-blur-md bg-white/20 text-white border-white/40">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Controls */}
            {total > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors"
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors"
                  onClick={goNext}
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-6xl max-h-[85vh] ${isMobile ? "max-w-md aspect-[9/16]" : "aspect-[16/9]"} rounded-2xl overflow-hidden shadow-2xl border border-white/20`}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${accentColor}40`
              }}
            >
              <Image
                src={images[selectedIndex] || ""}
                alt={`${title} screenshot ${selectedIndex + 1}`}
                fill
                className={`${isMobile ? "object-contain" : "object-cover"} bg-black/40`}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              
              {/* Slide Counter */}
              <div 
                className="absolute top-4 left-4 glass-badge shadow-lg"
                style={{ backgroundColor: accentColor, color: '#fff' }}
              >
                {String(selectedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
