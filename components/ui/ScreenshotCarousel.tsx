"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface ScreenshotCarouselProps {
  images: string[];
  title: string;
  accentColor: string;
}

export default function ScreenshotCarousel({
  images,
  title,
  accentColor,
}: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning, current]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total);
  }, [current, total, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Touch/drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset < -threshold) {
      goNext();
    } else if (dragOffset > threshold) {
      goPrev();
    }
    setDragOffset(0);
  };

  return (
    <div className="relative" id="screenshot-carousel">
      {/* Main viewport */}
      <div
        className="relative overflow-hidden border-[3px] border-[var(--color-border)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Slide counter badge */}
        <div
          className="neo-badge absolute top-4 right-4 z-10 text-xs"
          style={{ backgroundColor: accentColor, color: "#fff" }}
          aria-live="polite"
          aria-atomic="true"
        >
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>

        {/* Image track */}
        <div
          ref={trackRef}
          className="flex touch-pan-y select-none"
          style={{
            transform: `translateX(calc(-${current * 100}% + ${
              isDragging ? dragOffset : 0
            }px))`,
            transition: isDragging
              ? "none"
              : "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="listbox"
          aria-label="Screenshot gallery"
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="relative aspect-[16/9] w-full shrink-0"
              role="option"
              aria-selected={current === i}
            >
              <Image
                src={image}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                draggable={false}
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              {/* Subtle vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 40%)",
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-[3px] border-[var(--color-border)] bg-[var(--color-surface)] text-lg font-extrabold transition-all hover:translate-x-[-2px] hover:translate-y-[calc(-50%-2px)]"
              style={{
                boxShadow: "var(--shadow-sm)",
              }}
              aria-label="Previous screenshot"
              id="carousel-prev"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-[3px] border-[var(--color-border)] bg-[var(--color-surface)] text-lg font-extrabold transition-all hover:translate-x-[2px] hover:translate-y-[calc(-50%-2px)]"
              style={{
                boxShadow: "var(--shadow-sm)",
              }}
              aria-label="Next screenshot"
              id="carousel-next"
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-3 w-3 border-2 border-[var(--color-border)] transition-all"
              style={{
                backgroundColor:
                  i === current ? accentColor : "var(--color-surface)",
                boxShadow:
                  i === current ? "2px 2px 0px var(--color-shadow)" : "none",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mt-4 hidden gap-2 md:flex" aria-hidden="true">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="aspect-[16/9] flex-1 overflow-hidden border-[3px] transition-all"
              style={{
                borderColor:
                  i === current ? accentColor : "var(--color-border)",
                opacity: i === current ? 1 : 0.5,
                boxShadow:
                  i === current ? `4px 4px 0px ${accentColor}` : "none",
                transform: i === current ? "translate(-2px, -2px)" : "none",
              }}
              tabIndex={-1}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
