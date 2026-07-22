"use client";

import { useActionState, useEffect } from "react";
import { sendContactEmail } from "@/actions/contact";
import { useFormStatus } from "react-dom";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import { SendHorizontal, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      id="contact-submit"
      className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all duration-300 ${pending ? "cursor-not-allowed opacity-70" : "hover:scale-[1.02] active:scale-[0.98]"}`}
      style={{
        background: "linear-gradient(135deg, #0071e3cc, #0071e388)",
        boxShadow:
          "0 0 0 1px rgba(0,113,227,0.4), 0 8px 24px rgba(0,113,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <span>Send Message</span>
          <SendHorizontal className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </>
      )}
      {!pending && (
        <span
          className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state?.success) {
      trackUserAction(AnalyticsEvents.CONTACT_FORM_SUBMIT);
    } else if (state?.error) {
      trackUserAction(AnalyticsEvents.CONTACT_FORM_ERROR, {
        error_message: state.error,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-4 text-left">
      {state?.success && (
        <div
          className="mb-4 border border-[#166534] bg-[#dcfce7] p-4 text-sm text-[#166534] shadow-md"
          role="alert"
        >
          <span className="font-extrabold">Success!</span> Your message has been
          sent successfully.
        </div>
      )}
      {state?.error && (
        <div
          className="mb-4 border border-[#991b1b] bg-[#fee2e2] p-4 text-sm text-[#991b1b] shadow-md"
          role="alert"
        >
          <span className="font-extrabold">Error!</span> {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className="glass-input peer pt-6 pb-2 placeholder-transparent"
            required
          />
          <label
            htmlFor="contact-name"
            className="text-text-muted peer-focus:text-primary pointer-events-none absolute top-2 left-4 text-xs font-bold tracking-wider uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="contact-email-input"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            className="glass-input peer pt-6 pb-2 placeholder-transparent"
            required
          />
          <label
            htmlFor="contact-email-input"
            className="text-text-muted peer-focus:text-primary pointer-events-none absolute top-2 left-4 text-xs font-bold tracking-wider uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase"
          >
            Email
          </label>
        </div>
      </div>
      <div className="relative">
        <textarea
          id="contact-message"
          name="message"
          placeholder="Send me a <hello /> or a dad joke. I'm all ears! 💻✨"
          className="glass-textarea peer pt-6 pb-2 placeholder-transparent"
          rows={5}
          required
        />
        <label
          htmlFor="contact-message"
          className="text-text-muted peer-focus:text-primary pointer-events-none absolute top-2 left-4 text-xs font-bold tracking-wider uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase"
        >
          Message
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
