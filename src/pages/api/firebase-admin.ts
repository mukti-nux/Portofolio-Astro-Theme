import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://shazqiai-notif-login-default-rtdb.asia-southeast1.firebasedatabase.app/", // ganti sesuai project
  });
}

const db = admin.database();

// Ambil semua user yang subscribed = true
const ref = db.ref("users");
const snapshot = await ref.once("value");

const emails: string[] = [];

snapshot.forEach((child) => {
  const data = child.val();
  if (data.subscribed === true && data.email) {
    emails.push(data.email);
  }
});
