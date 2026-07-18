"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="glass-btn glass-btn-primary !bg-red-500 !shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:!bg-red-600 glass-btn-sm shrink-0"
    >
      Logout
    </button>
  );
}
