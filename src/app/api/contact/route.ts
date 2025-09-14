import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "My Portfolio Visitor", email: "tanvirazad49@gmail.com" },
        to: [{ email: "tanvirazadwork@gmail.com", name: "You" }],
        replyTo: { email, name },
        subject: `${subject}`,
        textContent: 
          `You got a new message from your portfolio contact form:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}`,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Brevo error response:", errorText);
      throw new Error("Brevo API request failed");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Brevo error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
