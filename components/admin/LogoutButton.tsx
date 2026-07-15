"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="shrink-0 rounded-lg border border-border/50 bg-red-500 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-1 active:shadow-none sm:text-xs"
    >
      Logout
    </button>
  );
}
