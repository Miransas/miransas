"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSignal(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const data = await resend.emails.send({
      from: "Miransas System <onboarding@resend.dev>", // Domaini bağlayana kadar Resend'in test mailini kullan
      to: "sardorazimov2901@gmail.com", // Buraya mesajların düşmesini istediğin kendi mailini yaz ustam
      subject: `⚠️ NEW ENCRYPTED SIGNAL FROM: ${name}`,
      text: `
      --- MIRANSAS TERMINAL INCOMING PAYLOAD ---
      
      ORIGIN ID: ${name}
      RETURN ROUTE: ${email}
      
      PAYLOAD DATA:
      ${message}
      
      ------------------------------------------
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}