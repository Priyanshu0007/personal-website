"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCw,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/utils/constants";

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
  const [direction, setDirection] = useState(0);
  const [isRotated, setIsRotated] = useState(false);

  const total = images.length;

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    setIsRotated(false);
  }, []);

  const toggleRotation = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsRotated((r) => !r);
  }, []);

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setDirection(1);
        setSelectedIndex((selectedIndex + 1) % total);
      }
    },
    [selectedIndex, total]
  );

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setDirection(-1);
        setSelectedIndex((selectedIndex - 1 + total) % total);
      }
    },
    [selectedIndex, total]
  );

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  if (total === 0) return null;

  const aspectRatioClass = isMobile ? "aspect-[9/16]" : "aspect-[16/9]";

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid grid-cols-2 gap-4 ${total === 1 ? "md:grid-cols-1" : "md:grid-cols-3"}`}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`glass-card group relative cursor-pointer overflow-hidden rounded-2xl p-1 ${
              i === 0 && !isMobile && total > 2 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => setSelectedIndex(i)}
            style={{
              borderColor: "var(--color-border)",
            }}
          >
            <div
              className={`relative h-full w-full ${i === 0 && !isMobile && total > 2 ? "aspect-video" : aspectRatioClass} overflow-hidden rounded-xl`}
            >
              {img ? (
                <Image
                  src={img}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                />
              ) : null}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="glass-btn glass-btn-sm rounded-full border-white/40 bg-white/20 p-3 text-white backdrop-blur-md">
                  <Maximize2 className="h-5 w-5" />
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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 flex items-center justify-center"
              style={{
                width: isRotated ? "100vh" : "100vw",
                height: isRotated ? "100vw" : "100vh",
                transform: `translate(-50%, -50%) rotate(${isRotated ? 90 : 0}deg)`,
                transition:
                  "width 0.3s ease, height 0.3s ease, transform 0.3s ease",
              }}
            >
              <div
                className="pointer-events-auto relative flex h-full w-full items-center justify-center p-4 md:p-8"
                onClick={closeLightbox}
              >
                {/* Controls Container */}
                <div className="pointer-events-none absolute inset-0 z-50 p-4 md:p-8">
                  {/* Close Button */}
                  <button
                    className="pointer-events-auto absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:top-8 md:right-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeLightbox();
                    }}
                    aria-label="Close lightbox"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  {/* Rotate Button */}
                  <button
                    className="pointer-events-auto absolute top-4 right-20 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:hidden"
                    onClick={toggleRotation}
                    aria-label="Rotate image"
                  >
                    <RotateCw className="h-6 w-6" />
                  </button>

                  {/* Navigation Controls */}
                  {total > 1 && (
                    <>
                      <button
                        className="pointer-events-auto absolute top-1/2 left-4 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-8"
                        onClick={goPrev}
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        className="pointer-events-auto absolute top-1/2 right-4 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-8"
                        onClick={goNext}
                        aria-label="Next screenshot"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Main Image Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className={`relative max-h-full w-full max-w-6xl ${isMobile ? "aspect-[9/16] max-w-md" : "aspect-[16/9]"} overflow-hidden rounded-2xl border border-white/20 shadow-2xl`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${accentColor}40`,
                  }}
                >
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={selectedIndex}
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? "100%" : "-100%",
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (direction: number) => ({
                          x: direction < 0 ? "100%" : "-100%",
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute inset-0 h-full w-full"
                    >
                      {images[selectedIndex] ? (
                        <Image
                          src={images[selectedIndex]}
                          alt={`${title} screenshot ${selectedIndex + 1}`}
                          fill
                          className={`${isMobile ? "object-contain" : "object-cover"} bg-black/40`}
                          priority
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide Counter */}
                  <div
                    className="glass-badge absolute top-4 left-4 z-10 shadow-lg"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
