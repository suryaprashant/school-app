import admin from "firebase-admin";
import {getApps, getApp} from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FCM_SERVER_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Check if an app already exists
const app = getApps().length === 0
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : getApp();

export const pushNotification = async ({ deviceToken, title, body }) => {
  try {
    const message = {
      token: deviceToken,
      notification: { title, body },
    };
    return await admin.messaging().send(message);
  } catch (err) {
    console.error("Push Notification Error:", err);
    throw err;
  }
};

