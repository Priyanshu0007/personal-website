"use client";

import { useActionState, useEffect } from "react";
import { sendContactEmail } from "@/actions/contact";
import { useFormStatus } from "react-dom";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`group glass-btn glass-btn-primary glass-btn-lg w-full glass-sweep ${pending ? "cursor-not-allowed opacity-70" : ""}`}
      id="contact-submit"
    >
      {pending ? "Sending..." : "Send Message"}{" "}
      {!pending && (
        <span
          aria-hidden="true"
          className="ml-1 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
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
      trackUserAction(AnalyticsEvents.CONTACT_FORM_ERROR, { error_message: state.error });
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
            className="glass-input peer placeholder-transparent pt-6 pb-2"
            required
          />
          <label
            htmlFor="contact-name"
            className="pointer-events-none absolute left-4 top-2 text-xs font-bold uppercase tracking-wider text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-primary"
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
            className="glass-input peer placeholder-transparent pt-6 pb-2"
            required
          />
          <label
            htmlFor="contact-email-input"
            className="pointer-events-none absolute left-4 top-2 text-xs font-bold uppercase tracking-wider text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-primary"
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
          className="glass-textarea peer placeholder-transparent pt-6 pb-2"
          rows={5}
          required
        />
        <label
          htmlFor="contact-message"
          className="pointer-events-none absolute left-4 top-2 text-xs font-bold uppercase tracking-wider text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-primary"
        >
          Message
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
