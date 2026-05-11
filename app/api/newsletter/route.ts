import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildSubscriptionEmailHtml(subscriberEmail: string): string {
  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;border-radius:12px;overflow:hidden;border:1px solid #1e293b">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#2dc5f4 0%,#12e399 100%);padding:32px 24px;text-align:center">
        <h1 style="margin:0;font-size:22px;color:#08121e;font-weight:700">New Newsletter Subscriber</h1>
        <p style="margin:8px 0 0;font-size:14px;color:#08121e;opacity:0.7">Square Solutions Website</p>
      </div>
      
      <!-- Body -->
      <div style="padding:32px 24px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:12px 0;color:#8b949e;font-size:13px;width:140px;vertical-align:top">Subscriber Email</td>
            <td style="padding:12px 0;color:#2dc5f4;font-size:15px;font-weight:500">
              <a href="mailto:${escapeHtml(subscriberEmail)}" style="color:#2dc5f4;text-decoration:none">${escapeHtml(subscriberEmail)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-top:1px solid #1e293b;color:#8b949e;font-size:13px;vertical-align:top">Subscribed At</td>
            <td style="padding:12px 0;border-top:1px solid #1e293b;color:#f0f6fc;font-size:15px">${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="padding:16px 24px;background:#080c11;text-align:center;border-top:1px solid #1e293b">
        <p style="margin:0;font-size:12px;color:#484f58">This email was sent from the newsletter form on sq-solution.com</p>
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
    const email = String(body.email ?? "").trim();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Persist subscriber to DB (ignore if already exists)
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email, source: "website" }, { onConflict: "email", ignoreDuplicates: true });

    if (dbError) {
      console.warn("[newsletter/route] DB insert warning:", dbError.message);
    }

    const senderEmail =
      process.env.CONTACT_SENDER_EMAIL ?? "noreply@sq-solution.com";
    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL ?? "Info@Sq-Solution.Com";

    const { error } = await resend.emails.send({
      from: `Square Solutions Newsletter <${senderEmail}>`,
      to: [recipientEmail],
      replyTo: email,
      subject: `📬 New Newsletter Subscriber: ${email}`,
      html: buildSubscriptionEmailHtml(email),
    });

    if (error) {
      console.error("[newsletter/route] Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[newsletter/route] Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
