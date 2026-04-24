import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Shape of the incoming contact form payload */
interface ContactPayload {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

/** Maps internal service keys to human-readable labels */
const SERVICE_LABELS: Record<string, string> = {
  software: "Software Applications & Solutions",
  consulting: "Consulting Services",
  "managed-it": "IT Managed Services",
  infra: "Digital Workplace & Infrastructure",
  marketing: "Digital Marketing",
  social: "Social Media Management",
};

function validatePayload(body: unknown): ContactPayload {
  const data = body as Record<string, unknown>;

  const fullName = String(data.fullName ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const service = String(data.service ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!fullName || !email || !message) {
    throw new Error("Full name, email, and message are required.");
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  // Message length guard
  if (message.length > 500) {
    throw new Error("Message exceeds 500 characters.");
  }

  return { fullName, phone, email, service, message };
}

function buildEmailHtml(data: ContactPayload): string {
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service ?? "—";

  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;border-radius:12px;overflow:hidden;border:1px solid #1e293b">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#2dc5f4 0%,#12e399 100%);padding:32px 24px;text-align:center">
        <h1 style="margin:0;font-size:22px;color:#08121e;font-weight:700">New Contact Form Submission</h1>
        <p style="margin:8px 0 0;font-size:14px;color:#08121e;opacity:0.7">Square Solutions Website</p>
      </div>
      
      <!-- Body -->
      <div style="padding:32px 24px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#8b949e;font-size:13px;width:140px;vertical-align:top">Full Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#f0f6fc;font-size:15px;font-weight:500">${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#8b949e;font-size:13px;vertical-align:top">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#2dc5f4;font-size:15px">
              <a href="mailto:${escapeHtml(data.email)}" style="color:#2dc5f4;text-decoration:none">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#8b949e;font-size:13px;vertical-align:top">Phone</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#f0f6fc;font-size:15px">${escapeHtml(data.phone || "—")}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#8b949e;font-size:13px;vertical-align:top">Service</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e293b;color:#12e399;font-size:15px;font-weight:500">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#8b949e;font-size:13px;vertical-align:top">Message</td>
            <td style="padding:12px 0;color:#f0f6fc;font-size:15px;line-height:1.6">${escapeHtml(data.message).replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="padding:16px 24px;background:#080c11;text-align:center;border-top:1px solid #1e293b">
        <p style="margin:0;font-size:12px;color:#484f58">This email was sent from the contact form on sq-solution.com</p>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validatePayload(body);

    const senderEmail =
      process.env.CONTACT_SENDER_EMAIL ?? "noreply@sq-solution.com";
    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL ?? "Info@Sq-Solution.Com";

    const { error } = await resend.emails.send({
      from: `Square Solutions <${senderEmail}>`,
      to: [recipientEmail],
      replyTo: data.email,
      subject: `New Inquiry from ${data.fullName}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[contact/route] Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
