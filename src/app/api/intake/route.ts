import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

type IntakeBody = {
  fullName: string;
  email: string;
  phone: string;
  goals: string;
  experience: string;
  availability: string;
  limitations: string;
  referral: string;
};

const MAX_LEN = {
  fullName: 120,
  email: 254,
  phone: 40,
  goals: 2000,
  experience: 120,
  availability: 300,
  limitations: 1500,
  referral: 200,
} as const;

function truncate(s: string, max: number) {
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

function buildSms(payload: IntakeBody): string {
  const lines = [
    `New PT inquiry: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Goals: ${truncate(payload.goals, 400)}`,
    `Experience: ${payload.experience}`,
    `Availability: ${truncate(payload.availability, 200)}`,
  ];
  if (payload.limitations) {
    lines.push(`Notes: ${truncate(payload.limitations, 280)}`);
  }
  if (payload.referral) {
    lines.push(`Referral: ${truncate(payload.referral, 120)}`);
  }
  let body = lines.join("\n");
  if (body.length > 1500) {
    body = `${body.slice(0, 1490)}…`;
  }
  return body;
}

export async function POST(request: Request) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.TRAINER_NOTIFY_PHONE;

  if (!sid || !token || !from || !to) {
    return NextResponse.json(
      {
        error:
          "SMS is not configured on the server. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, and TRAINER_NOTIFY_PHONE to your environment.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const b = json as Record<string, unknown>;
  const payload: IntakeBody = {
    fullName: String(b.fullName ?? ""),
    email: String(b.email ?? ""),
    phone: String(b.phone ?? ""),
    goals: String(b.goals ?? ""),
    experience: String(b.experience ?? ""),
    availability: String(b.availability ?? ""),
    limitations: String(b.limitations ?? ""),
    referral: String(b.referral ?? ""),
  };

  for (const [key, max] of Object.entries(MAX_LEN) as [
    keyof typeof MAX_LEN,
    number,
  ][]) {
    if (payload[key].length > max) {
      return NextResponse.json(
        { error: `Field "${key}" is too long.` },
        { status: 400 },
      );
    }
  }

  if (!payload.fullName || !payload.email || !payload.phone) {
    return NextResponse.json(
      { error: "Name, email, and phone are required." },
      { status: 400 },
    );
  }
  if (!payload.goals || !payload.experience || !payload.availability) {
    return NextResponse.json(
      { error: "Please complete all required questions." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const client = twilio(sid, token);
    await client.messages.create({
      body: buildSms(payload),
      from,
      to,
    });
  } catch (err) {
    console.error("Twilio error:", err);
    return NextResponse.json(
      {
        error:
          "Could not send the notification. Check Twilio credentials and phone numbers (E.164 format, e.g. +15551234567).",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
