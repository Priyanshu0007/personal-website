"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-border/10 bg-transparent py-5">
      <div className="marquee-track">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center text-sm font-semibold tracking-widest whitespace-nowrap text-text-secondary uppercase md:text-base"
          >
            {item}
            <span className="mx-6 block h-1.5 w-1.5 rounded-full bg-primary/30" />
          </span>
        ))}
      </div>
    </div>
  );
}
