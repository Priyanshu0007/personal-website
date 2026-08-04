"use server";

import { Resend } from "resend";
import { envConfig } from "@/utils/envConfig";
import { contactSchema } from "@/lib/validations";

const resend = new Resend(envConfig.resendApiKey);

export async function sendContactEmail(
  prevState: { success: boolean; error: string | null },
  formData: FormData
) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validatedData = contactSchema.safeParse(rawData);

    if (!validatedData.success) {
      const firstIssue = validatedData.error.issues[0];
      return {
        error: firstIssue ? firstIssue.message : "Validation failed",
        success: false,
      };
    }

    const { name, email, message } = validatedData.data;

    const { error } = await resend.emails.send({
      from: envConfig.resendFromEmail,
      to: envConfig.contactEmailTo,
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
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
    };
  }
}
