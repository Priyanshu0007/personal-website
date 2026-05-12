"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (step === "email") {
        // request OTP
        const res = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setStep("otp");
        } else {
          const err = await res.json();
          setError(err.error ?? "Failed to send OTP");
        }
      } else {
        // step === "otp"
        const result = await signIn("credentials", {
          email,
          otp,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/admin");
          router.refresh();
        } else {
          setError("Invalid OTP or expired. Please try again.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo / brand */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-black bg-primary text-black text-2xl font-black mb-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            PG
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portfolio Admin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 sm:p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-surface"
        >
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">
              {step === "email" ? "Sign In" : "Verify"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wide">
              {step === "email" ? "Enter your email to receive an OTP" : "Enter the code sent to your email"}
            </p>
          </div>

          {error && (
            <div className="p-3 border-2 border-black bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span className="break-words min-w-0">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {step === "email" ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    disabled={loading}
                    className="w-full p-3 border-2 border-black bg-background rounded-none outline-none focus:shadow-[4px_4px_0px_0px_var(--color-primary)] transition-all placeholder:text-muted-foreground/50 text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-3 sm:p-4 bg-primary text-black font-black uppercase tracking-widest text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Request OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    maxLength={6}
                    disabled={loading}
                    inputMode="numeric"
                    className="w-full p-3 border-2 border-black bg-background rounded-none outline-none focus:shadow-[4px_4px_0px_0px_var(--color-primary)] transition-all tracking-[0.4em] text-center font-bold text-lg sm:text-xl placeholder:tracking-normal placeholder:text-xs sm:placeholder:text-sm placeholder:text-muted-foreground/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-3 sm:p-4 bg-accent-green text-white font-black uppercase tracking-widest text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep("email"); setError(null); }}
                  className="w-full text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  ← Change Email
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
