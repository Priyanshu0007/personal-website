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
      <div className="text-4xl md:text-5xl mb-3">{hobby.emoji}</div>

      {/* Title */}
      <h4
        className="font-extrabold text-lg mb-2"
        style={{ color: hobby.color }}
      >
        {hobby.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] mb-3">
        {hobby.description}
      </p>

      {/* Tags */}
      {hobby.tags && hobby.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider border-[2px] border-[var(--color-border)]"
              style={{ backgroundColor: `${hobby.color}20`, color: hobby.color }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
