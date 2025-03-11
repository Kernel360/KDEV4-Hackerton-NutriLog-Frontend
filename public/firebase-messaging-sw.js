importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// 서비스 워커 파일
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("fcm service worker가 실행되었습니다.");
});

self.addEventListener("push", (e) => {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationBody = resultData.body;

  const notificationOptions = {
    body: notificationBody,
  };

  // 브라우저에서 푸시 알림을 표시 (기본적인 알림)
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  // 클라이언트에 메시지 전달 (postMessage)
  e.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "push-notification",
          title: notificationTitle,
          body: notificationBody,
        });
      });
    })
  );
});

const firebaseConfig = {
  apiKey: "AIzaSyBcYdVF9Fkv4mB3TTveD4w4NdKyg1hu6Dg",
  authDomain: "nutrilog-ef8a6.firebaseapp.com",
  projectId: "nutrilog-ef8a6",
  storageBucket: "nutrilog-ef8a6.firebasestorage.app",
  messagingSenderId: "470332253035",
  appId: "1:470332253035:web:c6bb4d7348b025b8d7622e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
