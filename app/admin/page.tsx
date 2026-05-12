import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  const allProjects = rawProjects.map(p => ({
    ...p,
    thumbnail: cleanUrl(p.thumbnail),
    images: cleanUrls(p.images),
  }));

  const allBlogs = rawBlogs.map(b => ({
    ...b,
    url: cleanUrl(b.url),
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="p-3 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-8 sm:space-y-12 pb-20">
        <header className="flex flex-col gap-3 border-b-4 border-black pb-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Admin
            </h1>
            <LogoutButton />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wide">
            Logged in as <span className="text-foreground">{session.user?.name ?? session.user?.email}</span>
          </p>
        </header>

        <AdminDashboardClient projects={allProjects} blogs={allBlogs} />
      </div>
    </div>
  );
}
