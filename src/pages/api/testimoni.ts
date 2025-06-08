import type { APIRoute } from "astro";
import admin from "firebase-admin";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!admin.apps.length) {
    const projectId = import.meta.env.FIREBASE_PROJECT_ID_2;
    const clientEmail = import.meta.env.FIREBASE_CLIENT_EMAIL_2;
    const privateKey = import.meta.env.FIREBASE_PRIVATE_KEY_2?.replace(/\\n/g, "\n");

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      databaseURL: "https://testimoni-input-default-rtdb.asia-southeast1.firebasedatabase.app/",
    });
  }

  const formData = await request.formData();
  const nama = formData.get("nama")?.toString();
  const pesan = formData.get("pesan")?.toString();

  if (!nama || !pesan) {
    return new Response("Data tidak valid", { status: 400 });
  }

  try {
    const db = admin.database();
    await db.ref("pesan").push({
      nama,
      pesan,
      createdAt: Date.now(),
    });

    return new Response(
      `<script>alert("Terima kasih atas pesan yang Anda sampaikan!"); window.location.href = "/";</script>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error(error);
    return new Response("Gagal menyimpan ke database", { status: 500 });
  }
};
