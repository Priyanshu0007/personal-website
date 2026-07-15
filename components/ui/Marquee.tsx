"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-border/20 bg-surface py-4">
      <div className="marquee-track">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center text-lg font-extrabold tracking-wider whitespace-nowrap text-text uppercase md:text-xl"
          >
            {item}
            <span className="mx-4 block h-2.5 w-2.5 rounded-full bg-primary opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
