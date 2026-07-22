"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div className="border-border/10 w-full overflow-hidden border-y bg-transparent py-5">
      <div className="marquee-track">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-text-secondary flex items-center text-sm font-semibold tracking-widest whitespace-nowrap uppercase md:text-base"
          >
            {item}
            <span className="bg-primary/30 mx-6 block h-1.5 w-1.5 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
