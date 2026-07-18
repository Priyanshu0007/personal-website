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
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-primary/80 backdrop-blur-xl text-2xl font-black text-white shadow-md">
            PG
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portfolio Admin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card flex flex-col gap-5 p-6 sm:p-8 w-full"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-tighter sm:text-3xl">
              {step === "email" ? "Sign In" : "Verify"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wide">
              {step === "email" ? "Enter your email to receive an OTP" : "Enter the code sent to your email"}
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-red-500/20 p-3 text-xs font-bold text-red-600 dark:text-red-400 sm:text-sm">
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
                    className="glass-input text-center font-bold text-lg tracking-[0.4em] placeholder:tracking-normal sm:text-xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-btn glass-btn-accent w-full text-sm bg-accent-green"
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
