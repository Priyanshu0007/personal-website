"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return {
        error: "Please fill out all fields.",
        success: false,
      };
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // onboarding@resend.dev is allowed on free tier
      to: process.env.CONTACT_EMAIL_TO as string,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      return {
        error: error.message,
        success: false,
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error.message || "An unexpected error occurred",
      success: false,
    };
  }
}
