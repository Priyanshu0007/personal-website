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
      className={`neo-btn neo-btn-primary neo-btn-lg w-full ${pending ? "opacity-70 cursor-not-allowed" : ""}`}
      id="contact-submit"
    >
      {pending ? "Sending..." : "Send Message →"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction} className="max-w-xl mx-auto space-y-4 text-left">
      {state?.success && (
        <div className="p-4 mb-4 text-sm bg-[#dcfce7] border-[3px] border-[#166534] shadow-[4px_4px_0px_#166534] text-[#166534]">
          <span className="font-extrabold">Success!</span> Your message has been sent successfully.
        </div>
      )}
      {state?.error && (
        <div className="p-4 mb-4 text-sm bg-[#fee2e2] border-[3px] border-[#991b1b] shadow-[4px_4px_0px_#991b1b] text-[#991b1b]">
          <span className="font-extrabold">Error!</span> {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-bold uppercase tracking-wider mb-2"
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
            className="block text-sm font-bold uppercase tracking-wider mb-2"
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
          className="block text-sm font-bold uppercase tracking-wider mb-2"
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
