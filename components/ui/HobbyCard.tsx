import type { Hobby } from "@/types";

interface HobbyCardProps {
  hobby: Hobby;
  index: number;
}

const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];

export default function HobbyCard({ hobby, index }: HobbyCardProps) {
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className="neo-card group cursor-default"
      style={{
        transform: `rotate(${rotation})`,
        borderColor: hobby.color,
      }}
    >
      {/* Emoji */}
      <div
        className="mb-3 text-4xl md:text-5xl"
        role="img"
        aria-label={`${hobby.title} icon`}
      >
        {hobby.emoji}
      </div>

      {/* Title */}
      <h3
        className="mb-2 text-lg font-extrabold"
        style={{ color: hobby.color }}
      >
        {hobby.title}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
        {hobby.description}
      </p>

      {/* Tags */}
      {hobby.tags && hobby.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="border-[2px] border-[var(--color-border)] px-2 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `${hobby.color}20`,
                color: hobby.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
