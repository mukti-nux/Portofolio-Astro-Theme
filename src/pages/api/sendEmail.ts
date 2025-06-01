// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

// Inisialisasi Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "YOUR_PROJECT_ID",
      clientEmail: "YOUR_CLIENT_EMAIL",
      privateKey: "YOUR_PRIVATE_KEY".replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("subscribed", "==", true).get();

    const emails = snapshot.docs.map(doc => doc.data().email);
    if (!emails.length) return res.status(200).json({ message: "No subscribers found." });

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emailkamu@gmail.com",
        pass: "app-password-kamu", // bukan password Gmail, tapi [App Password](https://myaccount.google.com/apppasswords)
      },
    });

    const info = await transporter.sendMail({
      from: '"ShazqIAI Bot" <emailkamu@gmail.com>',
      to: emails.join(","),
      subject: "📄 Dokumentasi Baru ShazqIAI!",
      text: "Hai, ada dokumentasi baru yang tersedia. Yuk cek sekarang di website!",
      html: "<p>Hai, ada <strong>dokumentasi baru</strong> yang tersedia.<br/>Yuk cek sekarang di <a href='https://shazqiai.com'>website</a>!</p>",
    });

    res.status(200).json({ message: "Emails sent!", info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengirim email." });
  }
}