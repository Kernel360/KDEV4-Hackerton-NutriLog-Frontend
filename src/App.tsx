import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { useEffect, useState } from "react";
import NotificationComponent from "./components/NotificationComponent";
interface Notification {
  title: string;
  body: string;
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // 서비스 워커에서 보낸 메시지를 수신
    // if (navigator.serviceWorker) {
    //   navigator.serviceWorker.addEventListener("message", (event) => {
    //     const { type, title, body } = event.data;

    //     if (type === "push-notification") {
    //       setNotification({ title, body });
    //     }
    //   });
    // }

    // 서비스 워커가 등록되었을 때 메시지 리스너 추가
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("/firebase-messaging-sw.js")
    //     .then((registration) => {
    //       console.log("서비스 워커 등록 성공:", registration);
    //     })
    //     .catch((error) => {
    //       console.error("서비스 워커 등록 실패:", error);
    //     });

    // 서비스 워커로부터 메시지를 수신하는 리스너 설정
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener(
        "message",
        (event: MessageEvent) => {
          console.log("서비스 워커로부터 받은 메시지:", event.data);
          // 여기서 받은 메시지에 대해 필요한 작업을 할 수 있습니다.
          const { messageType, notification } = event.data;

          if (messageType === "push-received") {
            setNotification({
              title: notification.title,
              body: notification.body,
            });
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  }, [notification]);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center gap-10">
        <div
          id="layout-Root"
          className="relative flex h-full max-h-[950px] min-h-[600px] w-full min-w-[350px] max-w-[450px] shrink-0 flex-col shadow-xl"
        >
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
          {/* /login 경로가 아니면 Footer를 렌더링 */}
          {!isLoginPage && <Footer />}
        </div>
      </div>

      {/* 푸시 알림이 있으면 화면에 표시 */}
      {notification && (
        <NotificationComponent
          title={notification.title}
          body={notification.body}
        />
      )}
    </>
  );
}

export default App;
