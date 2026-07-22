"use client";

import { useState, useEffect } from "react";
import { createBlog, updateBlog } from "@/actions/admin";
import { useRouter } from "next/navigation";

interface BlogFormData {
  id: string;
  title: string;
  url: string;
  platform: string;
  date: string;
  description: string;
  hide: boolean;
}

const emptyBlog: BlogFormData = {
  id: "",
  title: "",
  url: "",
  platform: "Medium",
  date: new Date().toISOString().split("T")[0] || "",
  description: "",
  hide: false,
};

interface Props {
  initialData?: BlogFormData;
  isEditing?: boolean;
  onClose: () => void;
}

export default function BlogForm({
  initialData,
  isEditing = false,
  onClose,
}: Props) {
  const [form, setForm] = useState<BlogFormData>(initialData ?? emptyBlog);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const set = (key: keyof BlogFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const result = isEditing
      ? await updateBlog(initialData!.id, form)
      : await createBlog(form);

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 sm:flex sm:items-start sm:justify-center sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full space-y-5 sm:my-8 sm:min-h-0 sm:max-w-2xl sm:p-6"
      >
        {/* Header */}
        <div className="bg-surface/80 border-border/50 sticky top-0 z-20 -mx-4 flex items-center justify-between border-b px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6">
          <h2 className="text-lg font-bold uppercase sm:text-2xl">
            {isEditing ? "Edit Blog" : "New Blog"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border text-xl font-bold transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* ID */}
        {!isEditing && (
          <Field label="ID (unique slug)" error={errors.id}>
            <input
              value={form.id}
              onChange={(e) =>
                set(
                  "id",
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                )
              }
              className="glass-input"
              placeholder="my-blog-post"
            />
          </Field>
        )}

        {/* Title */}
        <Field label="Title" error={errors.title}>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="glass-input"
            placeholder="Blog Post Title"
          />
        </Field>

        {/* URL */}
        <Field label="Blog URL" error={errors.url}>
          <input
            value={form.url}
            onChange={(e) => set("url", e.target.value)}
            className="glass-input"
            placeholder="https://medium.com/@you/article"
          />
        </Field>

        {/* Platform */}
        <Field label="Platform" error={errors.platform}>
          <select
            value={form.platform}
            onChange={(e) => set("platform", e.target.value)}
            className="glass-input"
          >
            <option value="Medium">Medium</option>
            <option value="Dev.to">Dev.to</option>
            <option value="Hashnode">Hashnode</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        {/* Date */}
        <Field label="Published Date" error={errors.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="glass-input"
          />
        </Field>

        {/* Description */}
        <Field label="Description" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="glass-input min-h-[100px]"
            placeholder="A short description of the blog post…"
          />
        </Field>

        {/* Hidden toggle */}
        <label className="group flex cursor-pointer items-center gap-3 select-none">
          <div
            onClick={() => set("hide", !form.hide)}
            className={`border-border/50 flex h-6 w-6 items-center justify-center rounded border transition-all ${
              form.hide ? "bg-primary shadow-md" : "bg-white shadow-md"
            } group-active:translate-x-[1px] group-active:translate-y-[1px] group-active:shadow-none`}
          >
            {form.hide && (
              <svg
                className="text-text h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
          <span className="text-xs font-black tracking-widest uppercase">
            Hidden
          </span>
        </label>

        {/* Actions */}
        <div className="border-border/50 bg-surface/80 sticky bottom-0 z-20 -mx-4 flex flex-col gap-3 border-t px-4 pt-4 pb-2 backdrop-blur-md sm:-mx-6 sm:flex-row sm:px-6">
          <button
            type="submit"
            disabled={saving}
            className="glass-btn glass-btn-primary flex-1"
          >
            {saving ? "Saving…" : isEditing ? "Update Blog" : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="glass-btn glass-btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold tracking-wide uppercase sm:text-sm">
        {label}
      </label>
      {children}
      {error &&
        error.map((e, i) => (
          <p key={i} className="mt-1 text-xs text-red-500">
            {e}
          </p>
        ))}
    </div>
  );
}
