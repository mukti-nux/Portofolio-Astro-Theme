// src/pages/api/subscribe.ts
import type { APIRoute } from "astro";
import admin from "firebase-admin";

export const prerender = false;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: "https://shazqiai-notif-login-default-rtdb.asia-southeast1.firebasedatabase.app/", // ganti sesuai milikmu
  });
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if (!email) {
    return new Response("Email tidak valid", { status: 400 });
  }

  try {
    const db = admin.database();
    await db.ref("users").push({
      email,
      subscribed: true,
      createdAt: Date.now(),
    });

    return new Response(
      `<script>alert("Berhasil subscribe!"); window.location.href = "/";</script>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error(error);
    return new Response("Gagal menyimpan ke database", { status: 500 });
  }
};
