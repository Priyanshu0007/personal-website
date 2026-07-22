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
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo / brand */}
        <div className="mb-6 text-center">
          <div className="border-border/50 bg-primary/80 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-black text-white shadow-md backdrop-blur-xl">
            PG
          </div>
          <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Portfolio Admin
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card flex w-full flex-col gap-5 p-6 sm:p-8"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tighter uppercase sm:text-3xl">
              {step === "email" ? "Sign In" : "Verify"}
            </h1>
            <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase sm:text-sm">
              {step === "email"
                ? "Enter your email to receive an OTP"
                : "Enter the code sent to your email"}
            </p>
          </div>

          {error && (
            <div className="border-border/50 flex items-center gap-2 rounded-lg border bg-red-500/20 p-3 text-xs font-bold text-red-600 sm:text-sm dark:text-red-400">
              <span className="text-base">⚠️</span>
              <span className="min-w-0 break-words">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {step === "email" ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-black tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    disabled={loading}
                    className="glass-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-btn glass-btn-primary w-full text-sm"
                >
                  {loading ? "Sending..." : "Request OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-black tracking-widest uppercase">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    maxLength={6}
                    disabled={loading}
                    inputMode="numeric"
                    className="glass-input text-center text-lg font-bold tracking-[0.4em] placeholder:tracking-normal sm:text-xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-btn glass-btn-accent bg-accent-green w-full text-sm"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError(null);
                  }}
                  className="text-muted-foreground hover:text-foreground w-full py-2 text-xs font-black tracking-widest uppercase transition-colors"
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
