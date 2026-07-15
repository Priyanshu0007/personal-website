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

export default function BlogForm({ initialData, isEditing = false, onClose }: Props) {
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
    <div className="fixed inset-0 z-50 bg-black/60 sm:flex sm:items-start sm:justify-center sm:p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-5 rounded-3xl border border-border/50 bg-surface p-4 shadow-md sm:my-8 sm:min-h-0 sm:max-w-2xl sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-surface z-20 py-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-secondary/30-2 border-secondary/30lack/10">
          <h2 className="text-lg sm:text-2xl font-bold uppercase">
            {isEditing ? "Edit Blog" : "New Blog"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-xl font-bold transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* ID */}
        {!isEditing && (
          <Field label="ID (unique slug)" error={errors.id}>
            <input
              value={form.id}
              onChange={(e) => set("id", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              className="admin-input"
              placeholder="my-blog-post"
            />
          </Field>
        )}

        {/* Title */}
        <Field label="Title" error={errors.title}>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className="admin-input" placeholder="Blog Post Title" />
        </Field>

        {/* URL */}
        <Field label="Blog URL" error={errors.url}>
          <input value={form.url} onChange={(e) => set("url", e.target.value)} className="admin-input" placeholder="https://medium.com/@you/article" />
        </Field>

        {/* Platform */}
        <Field label="Platform" error={errors.platform}>
          <select value={form.platform} onChange={(e) => set("platform", e.target.value)} className="admin-input">
            <option value="Medium">Medium</option>
            <option value="Dev.to">Dev.to</option>
            <option value="Hashnode">Hashnode</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        {/* Date */}
        <Field label="Published Date" error={errors.date}>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="admin-input" />
        </Field>

        {/* Description */}
        <Field label="Description" error={errors.description}>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="admin-input min-h-[100px]" placeholder="A short description of the blog post…" />
        </Field>

        {/* Hidden toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <div
            onClick={() => set("hide", !form.hide)}
            className={`flex h-6 w-6 items-center justify-center rounded border border-border/50 transition-all ${form.hide
                ? "bg-primary shadow-md"
                : "bg-white shadow-md"
              } group-active:shadow-none group-active:translate-x-[1px] group-active:translate-y-[1px]`}
          >
            {form.hide && (
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
          <span className="text-xs font-black uppercase tracking-widest">Hidden</span>
        </label>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-secondary/30lack/20 sticky bottom-0 bg-surface pb-2 z-20">
          <button type="submit" disabled={saving} className="admin-btn flex-1">
            {saving ? "Saving…" : isEditing ? "Update Blog" : "Create Blog"}
          </button>
          <button type="button" onClick={onClose} className="admin-btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

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
