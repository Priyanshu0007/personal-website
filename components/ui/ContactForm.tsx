"use client";

import { useActionState } from "react";
import { sendContactEmail } from "@/actions/contact";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`neo-btn neo-btn-primary neo-btn-lg w-full ${pending ? "cursor-not-allowed opacity-70" : ""}`}
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

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-4 text-left">
      {state?.success && (
        <div
          className="mb-4 border-[3px] border-[#166534] bg-[#dcfce7] p-4 text-sm text-[#166534] shadow-[4px_4px_0px_#166534]"
          role="alert"
        >
          <span className="font-extrabold">Success!</span> Your message has been
          sent successfully.
        </div>
      )}
      {state?.error && (
        <div
          className="mb-4 border-[3px] border-[#991b1b] bg-[#fee2e2] p-4 text-sm text-[#991b1b] shadow-[4px_4px_0px_#991b1b]"
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
            placeholder="Your name"
            className="neo-input"
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
            placeholder="your@email.com"
            className="neo-input"
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
          className="neo-textarea"
          rows={5}
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
