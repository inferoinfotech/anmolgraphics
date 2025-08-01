// app/api/contact/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const recipientEmail = process.env.RESEND_RECIPIENT_EMAIL || "";
const senderEmail = process.env.RESEND_SENDER_EMAIL || "";

export async function POST(req) {
  // CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Debug: Log validation
    if (!name || !email || !phone || !subject || !message) {
      return new Response("Missing required fields", { status: 400, headers });
    }

    await resend.emails.send({
      from: `Contact Form <${senderEmail}>`,
      to: recipientEmail,
      subject: `Inquiry: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return new Response("Email sent", { status: 200, headers });

  } catch (error) {
    // Debug: Log full error
    console.error("Error while sending email:", error);
    return new Response("Failed to send", { status: 500, headers });
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
