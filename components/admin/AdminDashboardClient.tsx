"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProjectForm from "@/components/admin/ProjectForm";
import BlogForm from "@/components/admin/BlogForm";
import { toggleProjectVisibility, toggleBlogVisibility, deleteProject, deleteBlog } from "@/actions/admin";
import { useRouter } from "next/navigation";

interface ProjectRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: "react-js" | "react-native" | "next-js" | "other";
  techStack: string[];
  images: string[];
  thumbnail: string;
  liveUrl: string | null;
  githubUrl: string | null;
  isFavorite: boolean;
  featured: boolean;
  createdAt: string;
  highlights: string[];
  hide: boolean;
}

interface BlogRow {
  id: string;
  title: string;
  url: string;
  platform: string;
  date: string;
  description: string;
  hide: boolean;
}

interface Props {
  projects: ProjectRow[];
  blogs: BlogRow[];
}

export default function AdminDashboardClient({ projects, blogs }: Props) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const router = useRouter();

  const isModalOpen = showProjectForm || showBlogForm;

  // Close any open modal
  const closeModals = useCallback(() => {
    setShowProjectForm(false);
    setShowBlogForm(false);
    setEditingProject(null);
    setEditingBlog(null);
  }, []);

  // Handle browser back button to close modals (mobile UX)
  useEffect(() => {
    if (!isModalOpen) return;

    // Push a sentinel state so pressing back pops it instead of navigating away
    window.history.pushState({ adminModal: true }, "");

    const onPopState = (e: PopStateEvent) => {
      // Only close if we're popping our sentinel
      if (e.state?.adminModal !== true) {
        closeModals();
      } else {
        closeModals();
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [isModalOpen, closeModals]);

  // When a modal is closed programmatically (not via back button), pop the sentinel
  const handleCloseModal = useCallback(() => {
    closeModals();
    // Pop the sentinel we pushed — only if it exists
    if (window.history.state?.adminModal) {
      window.history.back();
    }
  }, [closeModals]);

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    await deleteProject(id);
    setDeletingId(null);
    router.refresh();
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(id);
    await deleteBlog(id);
    setDeletingId(null);
    router.refresh();
  };

  const handleToggleProject = async (id: number, hide: boolean) => {
    await toggleProjectVisibility(id, hide);
    router.refresh();
  };

  const handleToggleBlog = async (id: string, hide: boolean) => {
    await toggleBlogVisibility(id, hide);
    router.refresh();
  };

  return (
    <>
      {/* ── Projects ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold uppercase border-l-4 border-primary pl-3">
            Projects ({projects.length})
          </h2>
          <button
            onClick={() => setShowProjectForm(true)}
            className="admin-btn text-xs sm:text-sm whitespace-nowrap"
          >
            + Add
          </button>
        </div>

        <div className="grid gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-3 sm:p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-surface overflow-hidden"
            >
              {/* Top row: thumbnail + info */}
              <div className="flex items-center gap-3 mb-3">
                {project.thumbnail && (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 border-2 border-black/20 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base truncate">{project.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    /{project.slug} · {project.category}
                    {project.featured && " · ⭐"}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 text-[10px] sm:text-xs font-bold border-2 border-black ${
                    project.hide
                      ? "bg-red-500/20 text-red-500"
                      : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {project.hide ? "HIDDEN" : "LIVE"}
                </span>
              </div>

              {/* Action buttons row */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleProject(project.id, project.hide)}
                  className="admin-btn-sm flex-1 text-[11px]"
                >
                  Toggle
                </button>
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowProjectForm(true);
                  }}
                  className="admin-btn-sm flex-1 text-[11px]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={deletingId === project.id}
                  className="admin-btn-sm-danger flex-1 text-[11px]"
                >
                  {deletingId === project.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-muted-foreground text-center py-8 border-2 border-dashed border-foreground/20 text-sm">
              No projects yet. Add one above!
            </p>
          )}
        </div>
      </section>

      {/* ── Blogs ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold uppercase border-l-4 border-primary pl-3">
            Blogs ({blogs.length})
          </h2>
          <button
            onClick={() => setShowBlogForm(true)}
            className="admin-btn text-xs sm:text-sm whitespace-nowrap"
          >
            + Add
          </button>
        </div>

        <div className="grid gap-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-3 sm:p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-surface overflow-hidden"
            >
              {/* Top row: info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base truncate">{blog.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {blog.platform} · {blog.date}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 text-[10px] sm:text-xs font-bold border-2 border-black ${
                    blog.hide
                      ? "bg-red-500/20 text-red-500"
                      : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {blog.hide ? "HIDDEN" : "LIVE"}
                </span>
              </div>

              {/* Action buttons row */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleBlog(blog.id, blog.hide)}
                  className="admin-btn-sm flex-1 text-[11px]"
                >
                  Toggle
                </button>
                <button
                  onClick={() => {
                    setEditingBlog(blog);
                    setShowBlogForm(true);
                  }}
                  className="admin-btn-sm flex-1 text-[11px]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  disabled={deletingId === blog.id}
                  className="admin-btn-sm-danger flex-1 text-[11px]"
                >
                  {deletingId === blog.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-muted-foreground text-center py-8 border-2 border-dashed border-foreground/20 text-sm">
              No blogs yet. Add one above!
            </p>
          )}
        </div>
      </section>

      {/* ── Modals ─────────────────────────────────────────────── */}
      {showProjectForm && (
        <ProjectForm
          initialData={
            editingProject
              ? {
                  ...editingProject,
                  liveUrl: editingProject.liveUrl ?? "",
                  githubUrl: editingProject.githubUrl ?? "",
                }
              : undefined
          }
          onClose={handleCloseModal}
        />
      )}

      {showBlogForm && (
        <BlogForm
          initialData={editingBlog ?? undefined}
          isEditing={!!editingBlog}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
