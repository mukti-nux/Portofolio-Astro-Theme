import type { APIRoute } from "astro";
import admin from "firebase-admin";
import nodemailer from "nodemailer";

export const prerender = false

// Inisialisasi Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://shazqiai-notif-login-default-rtdb.asia-southeast1.firebasedatabase.app/", // Ganti sesuai project
  });
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: import.meta.env.GMAIL_USER,
    pass: import.meta.env.GMAIL_PASS,
  },
});

export const POST: APIRoute = async () => {
  try {
    const db = admin.database();
    const snapshot = await db.ref("users").once("value");

    const emails: string[] = [];

    snapshot.forEach((child) => {
      const data = child.val();
      if (data.subscribed === true && data.email) {
        emails.push(data.email);
      }
    });

    if (emails.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "No subscribed emails found." }), { status: 400 });
    }

    await transporter.sendMail({
      from: `"ShazqIAI" <${import.meta.env.GMAIL_USER}>`,
      to: emails.join(", "),
      subject: "📢 Dokumentasi Baru Telah Diunggah!",
      text: "Hai! Ada dokumentasi baru dari ShazqIAI. Cek sekarang di situs kami.",
    });

    return new Response(JSON.stringify({ success: true, sent: emails }), { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ success: false, message: "Gagal mengirim email." }), { status: 500 });
  }
};
