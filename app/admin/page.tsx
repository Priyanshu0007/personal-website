import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import LogoutButton from "@/components/admin/LogoutButton";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const rawProjects = await db.select().from(projects).orderBy(projects.id);
  const rawBlogs = await db.select().from(blogs);

  // Clean data for the admin components
  const allProjects = rawProjects.map((p) => ({
    ...p,
    thumbnail: cleanUrl(p.thumbnail),
    images: cleanUrls(p.images),
  }));

  const allBlogs = rawBlogs.map((b) => ({
    ...b,
    url: cleanUrl(b.url),
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-5xl space-y-8 p-3 pb-20 sm:space-y-12 sm:p-6 md:p-8">
        <header className="border-border/50 flex flex-col gap-3 border-b pb-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-black tracking-tight uppercase sm:text-3xl">
              Admin
            </h1>
            <LogoutButton />
          </div>
          <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase sm:text-sm">
            Logged in as{" "}
            <span className="text-foreground">
              {session.user?.name ?? session.user?.email}
            </span>
          </p>
        </header>

        <AdminDashboardClient projects={allProjects} blogs={allBlogs} />
      </div>
    </div>
  );
}
