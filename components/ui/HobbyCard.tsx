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
      className="glass-card group cursor-default"
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
      <h3 className="mb-2 text-lg font-extrabold text-text">
        {hobby.title}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-text-secondary">
        {hobby.description}
      </p>

      {/* Tags */}
      {hobby.tags && hobby.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="glass-badge text-[0.65rem]"
              style={{
                backgroundColor: hobby.color,
                color: "#fff",
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
