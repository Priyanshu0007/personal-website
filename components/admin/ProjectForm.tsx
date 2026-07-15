"use client";

import { useState, useEffect } from "react";
import { createProject, updateProject } from "@/actions/admin";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProjectCategory = "react-js" | "react-native" | "next-js" | "other";

interface ProjectFormData {
  id?: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  techStack: string[];
  images: string[];
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  isFavorite: boolean;
  featured: boolean;
  createdAt: string;
  highlights: string[];
  hide: boolean;
}

const emptyProject: ProjectFormData = {
  slug: "",
  title: "",
  description: "",
  longDescription: "",
  category: "react-js",
  techStack: [],
  images: [],
  thumbnail: "",
  liveUrl: "",
  githubUrl: "",
  isFavorite: false,
  featured: false,
  createdAt: new Date().toISOString().split("T")[0] || "",
  highlights: [],
  hide: false,
};

interface Props {
  initialData?: ProjectFormData;
  onClose: () => void;
}

export default function ProjectForm({ initialData, onClose }: Props) {
  const isEditing = !!initialData?.id;
  const [form, setForm] = useState<ProjectFormData>(initialData ?? emptyProject);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // For adding tech stack items
  const [techInput, setTechInput] = useState("");
  // For adding image URLs
  const [imageInput, setImageInput] = useState("");
  // For adding highlights
  const [highlightInput, setHighlightInput] = useState("");

  const set = (key: keyof ProjectFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const payload = {
      ...form,
      liveUrl: form.liveUrl || null,
      githubUrl: form.githubUrl || null,
    };

    const result = isEditing
      ? await updateProject(initialData!.id!, payload)
      : await createProject(payload);

    if (result.error) {
      setErrors(result.error as Record<string, string[]>);
      setSaving(false);
      return;
    }

    setSaving(false);
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 sm:flex sm:items-start sm:justify-center sm:p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-5 rounded-3xl border border-border/50 bg-surface p-4 shadow-md sm:my-8 sm:min-h-0 sm:max-w-3xl sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-surface z-20 py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-secondary/30-2 border-secondary/30lack/10">
          <h2 className="text-lg sm:text-2xl font-bold uppercase">
            {isEditing ? "Edit Project" : "New Project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-xl font-bold transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <Field label="Title" error={errors.title}>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className="admin-input" placeholder="My Awesome Project" />
        </Field>

        {/* Slug */}
        <Field label="Slug" error={errors.slug}>
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
            className="admin-input"
            placeholder="my-awesome-project"
          />
        </Field>

        {/* Category */}
        <Field label="Category" error={errors.category}>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="admin-input">
            <option value="react-js">React.js</option>
            <option value="react-native">React Native</option>
            <option value="next-js">Next.js</option>
            <option value="other">Other</option>
          </select>
        </Field>

        {/* Description */}
        <Field label="Short Description" error={errors.description}>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="admin-input min-h-[80px]" placeholder="Brief project description…" />
        </Field>

        {/* Long Description */}
        <Field label="Long Description" error={errors.longDescription}>
          <textarea value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} className="admin-input min-h-[120px]" placeholder="Detailed project description…" />
        </Field>

        {/* Thumbnail */}
        <Field label="Thumbnail URL" error={errors.thumbnail}>
          <input value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} className="admin-input" placeholder="https://cdn.example.com/thumb.png" />
          {form.thumbnail && (
            <div className="mt-2 inline-block overflow-hidden rounded-xl border border-border/50 bg-white p-1">
              <div className="relative h-24 sm:h-32 w-40 sm:w-56">
                <Image
                  src={form.thumbnail}
                  alt="Thumbnail preview"
                  fill
                  className="object-contain"
                  unoptimized={false}
                />
              </div>
            </div>
          )}
        </Field>

        {/* Images */}
        <Field label="Screenshot URLs" error={errors.images}>
          <div className="flex gap-2">
            <input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="admin-input flex-1 min-w-0"
              placeholder="Paste image URL…"
            />
            <button
              type="button"
              onClick={() => {
                if (imageInput.trim()) {
                  set("images", [...form.images, imageInput.trim()]);
                  setImageInput("");
                }
              }}
              className="admin-btn-sm shrink-0"
            >
              Add
            </button>
          </div>
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.images.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg border border-border/50 bg-white p-1">
                  <div className="relative h-16 w-24 sm:h-20 sm:w-32">
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      fill
                      className="object-contain"
                      unoptimized={false}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        {/* Tech Stack */}
        <Field label="Tech Stack" error={errors.techStack}>
          <div className="flex gap-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="admin-input flex-1 min-w-0"
              placeholder="React, TypeScript, …"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (techInput.trim()) {
                    set("techStack", [...form.techStack, techInput.trim()]);
                    setTechInput("");
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (techInput.trim()) {
                  set("techStack", [...form.techStack, techInput.trim()]);
                  setTechInput("");
                }
              }}
              className="admin-btn-sm shrink-0"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.techStack.map((tech, i) => (
              <span key={i} className="flex items-center gap-1 rounded-lg border border-border/50 bg-surface px-2 py-1 text-xs font-bold">
                {tech}
                <button type="button" onClick={() => set("techStack", form.techStack.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 ml-1">✕</button>
              </span>
            ))}
          </div>
        </Field>

        {/* Highlights */}
        <Field label="Highlights" error={errors.highlights}>
          <div className="flex gap-2">
            <input
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              className="admin-input flex-1 min-w-0"
              placeholder="Key achievement or feature…"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (highlightInput.trim()) {
                    set("highlights", [...form.highlights, highlightInput.trim()]);
                    setHighlightInput("");
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (highlightInput.trim()) {
                  set("highlights", [...form.highlights, highlightInput.trim()]);
                  setHighlightInput("");
                }
              }}
              className="admin-btn-sm shrink-0"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {form.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">•</span>
                <span className="flex-1 break-words">{h}</span>
                <button type="button" onClick={() => set("highlights", form.highlights.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 text-xs shrink-0">✕</button>
              </li>
            ))}
          </ul>
        </Field>

        {/* URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Live URL (optional)" error={errors.liveUrl}>
            <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} className="admin-input" placeholder="https://myproject.com" />
          </Field>
          <Field label="GitHub URL (optional)" error={errors.githubUrl}>
            <input value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} className="admin-input" placeholder="https://github.com/…" />
          </Field>
        </div>

        {/* Date */}
        <Field label="Created At" error={errors.createdAt}>
          <input type="date" value={form.createdAt} onChange={(e) => set("createdAt", e.target.value)} className="admin-input" />
        </Field>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <ToggleField label="Featured" checked={form.featured} onChange={(v) => set("featured", v)} />
          <ToggleField label="Favorite" checked={form.isFavorite} onChange={(v) => set("isFavorite", v)} />
          <ToggleField label="Hidden" checked={form.hide} onChange={(v) => set("hide", v)} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-secondary/30lack/20 sticky bottom-0 bg-surface pb-2 z-20">
          <button type="submit" disabled={saving} className="admin-btn flex-1">
            {saving ? "Saving…" : isEditing ? "Update Project" : "Create Project"}
          </button>
          <button type="button" onClick={onClose} className="admin-btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wide mb-1">{label}</label>
      {children}
      {error && error.map((e, i) => (
        <p key={i} className="text-red-500 text-xs mt-1">{e}</p>
      ))}
    </div>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      <div
        onClick={() => onChange(!checked)}
        className={`flex h-6 w-6 items-center justify-center rounded border border-border/50 transition-all ${checked
            ? "bg-primary shadow-md"
            : "bg-white shadow-md"
          } group-active:shadow-none group-active:translate-x-[1px] group-active:translate-y-[1px]`}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-text"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </label>
  );
}
