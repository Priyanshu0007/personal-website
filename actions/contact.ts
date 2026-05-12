"use server";

import { Resend } from "resend";
import { envConfig } from "@/utils/envConfig";
import { z } from "zod";

const resend = new Resend(envConfig.resendApiKey);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

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
      return {
        error: validatedData.error.issues[0].message,
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
