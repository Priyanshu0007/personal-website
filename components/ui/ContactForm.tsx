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
      className={`glass-btn glass-btn-primary glass-btn-lg w-full ${pending ? "cursor-not-allowed opacity-70" : ""}`}
      id="contact-submit"
    >
      {pending ? "Sending..." : "Send Message"}{" "}
      {!pending && <span aria-hidden="true">→</span>}
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
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-bold tracking-wider uppercase"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className="glass-input"
            required
          />
        </div>
        <div>
          <label
            htmlFor="contact-email-input"
            className="mb-2 block text-sm font-bold tracking-wider uppercase"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email-input"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            className="glass-input"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-bold tracking-wider uppercase"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Send me a <hello /> or a dad joke. I'm all ears! 💻✨"
          className="glass-textarea"
          rows={5}
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
