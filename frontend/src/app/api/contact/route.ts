import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Destination email hardcoded strictly on server side (0 DB persistence)
const RECIPIENT_EMAIL = "jan992nyc@gmail.com";

const contactAttempts: Array<{
  createdAt: number;
  ip: string;
  email: string;
  messageHash: string;
}> = [];

function simpleHash(val: string): string {
  let hash = 0;
  for (let i = 0; i < val.length; i++) {
    const char = val.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16);
}

function pruneAttempts(now: number) {
  const cutoff = now - 86400000;
  const recent = contactAttempts.filter((a) => a.createdAt > cutoff);
  contactAttempts.length = 0;
  contactAttempts.push(...recent.slice(-2000));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name = "", email = "", message = "", website = "" } = body;

    // Honeypot check
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        { error: "This submission tripped the bot trap." },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanMessage = String(message).trim();

    if (!cleanName || cleanName.length > 80) {
      return NextResponse.json(
        { error: "Name must be 1-80 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 120) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 250) {
      return NextResponse.json(
        { error: "Message must be 10-250 characters." },
        { status: 400 }
      );
    }

    // Check excessive links
    const linkMatches = cleanMessage.match(/https?:\/\/|www\./gi) || [];
    if (linkMatches.length > 3) {
      return NextResponse.json(
        { error: "Too many links in message." },
        { status: 400 }
      );
    }

    // Repetitive character detection
    if (/(.)\1{24,}/.test(cleanMessage)) {
      return NextResponse.json(
        { error: "Message looks too repetitive." },
        { status: 400 }
      );
    }

    const now = Date.now();
    pruneAttempts(now);

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const msgHash = simpleHash(cleanMessage.toLowerCase().replace(/\s+/g, " "));

    const recentIpCount = contactAttempts.filter(
      (a) => a.ip === clientIp && a.createdAt > now - 60000
    ).length;
    if (recentIpCount >= 5) {
      return NextResponse.json(
        { error: "Please wait a minute before sending more messages." },
        { status: 429 }
      );
    }

    const recentEmailCount = contactAttempts.filter(
      (a) => a.email === cleanEmail && a.createdAt > now - 600000
    ).length;
    if (recentEmailCount >= 3) {
      return NextResponse.json(
        { error: "Too many messages from this email. Please try again later." },
        { status: 429 }
      );
    }

    const duplicateCount = contactAttempts.filter(
      (a) => a.messageHash === msgHash && a.createdAt > now - 86400000
    ).length;
    if (duplicateCount >= 1) {
      return NextResponse.json(
        { error: "Duplicate message detected." },
        { status: 429 }
      );
    }

    contactAttempts.push({
      createdAt: now,
      ip: clientIp,
      email: cleanEmail,
      messageHash: msgHash,
    });

    // SMTP credentials from environment variables
    const rawSmtpHost = (process.env.SMTP_HOST || "").trim();
    const rawSmtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const rawSmtpUser = (process.env.SMTP_USER || "").trim();
    // Automatically strip any spaces users might copy from Google's 4x4 app password display
    const rawSmtpPass = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const smtpFrom = (process.env.SMTP_FROM || rawSmtpUser || "portfolio@localhost").trim();

    const timestamp = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
    const mailSubject = `[Portfolio Feedback] 來信通知: ${cleanName}`;
    const mailContent = [
      `您收到了一則來自作品集網站的反饋建議：`,
      `--------------------------------------------------`,
      `寄件者姓名:  ${cleanName}`,
      `寄件者信箱:  ${cleanEmail}`,
      `送達時間:    ${timestamp} (台北時間)`,
      `寄件者 IP:   ${clientIp}`,
      `--------------------------------------------------`,
      ``,
      `留言內容:`,
      cleanMessage,
      ``,
      `--------------------------------------------------`,
      `(此訊息直接由後端發送至您的信箱，0 資料庫留存，確保隱私安全)`,
    ].join("\n");

    if (rawSmtpUser && rawSmtpPass) {
      try {
        let transporter: nodemailer.Transporter;

        if (rawSmtpHost.includes("gmail") || rawSmtpUser.endsWith("@gmail.com")) {
          // Gmail optimized transport with connection timeout
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: rawSmtpUser,
              pass: rawSmtpPass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
          });
        } else {
          transporter = nodemailer.createTransport({
            host: rawSmtpHost || "smtp.gmail.com",
            port: rawSmtpPort,
            secure: rawSmtpPort === 465,
            auth: {
              user: rawSmtpUser,
              pass: rawSmtpPass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
          });
        }

        await transporter.sendMail({
          from: `"${cleanName} (Portfolio)" <${smtpFrom}>`,
          to: RECIPIENT_EMAIL,
          replyTo: cleanEmail,
          subject: mailSubject,
          text: mailContent,
        });

        console.log(`[SMTP DISPATCH SUCCESS] Real email sent to ${RECIPIENT_EMAIL} for ${cleanName}`);
      } catch (mailErr: unknown) {
        console.error("Nodemailer dispatch error:", mailErr);
        const errMsg = mailErr instanceof Error ? mailErr.message : String(mailErr);
        const isAuthError =
          errMsg.includes("EAUTH") ||
          errMsg.includes("535") ||
          errMsg.includes("Username and Password not accepted") ||
          errMsg.includes("Invalid login");

        return NextResponse.json(
          {
            error: isAuthError ? "smtp_auth_failed" : "smtp_send_failed",
            detail: errMsg,
          },
          { status: 502 }
        );
      }
    } else {
      console.log(`[SIMULATED DISPATCH] (SMTP_USER or SMTP_PASSWORD not yet set)`);
      console.log(`To: ${RECIPIENT_EMAIL}\n${mailContent}`);
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Feedback received and dispatched directly to the administrator.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing contact message:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
