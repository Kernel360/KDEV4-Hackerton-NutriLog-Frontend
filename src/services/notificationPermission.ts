import { useAuthStore } from "../store/useAuthStore";
import { getToken, messaging } from "./initFirebase";

export async function handleAllowNotification(): Promise<void> {
  try {
    const { sendFcmTokenToServer } = useAuthStore.getState();
    const permission: NotificationPermission =
      await Notification.requestPermission();
    console.log("permission: " + permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      localStorage.setItem("fcmToken", token);
      console.log("발급된 토큰 정보: " + token);
      if (token) {
        await sendFcmTokenToServer(token); // (토큰을 서버로 전송하는 로직)
        console.log("토큰 서버로 전송 완료!");
      } else {
        console.log(
          "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
        );
      }
    } else if (permission === "denied") {
      console.log(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
