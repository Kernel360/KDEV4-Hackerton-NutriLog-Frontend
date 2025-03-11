// src/service/foregroundMessage.ts
import { getMessaging, onMessage, MessagePayload } from "firebase/messaging";
import { app } from "./initFirebase";

const messaging = getMessaging(app);

onMessage(messaging, (payload: MessagePayload) => {
  // console.log("알림 도착 ", payload);
  const notificationTitle: string = payload.notification?.title || "알림";
  const notificationOptions: NotificationOptions = {
    body: payload.notification?.body || "",
  };

  if (Notification.permission === "granted") {
    new Notification(notificationTitle, notificationOptions);
  }
});
