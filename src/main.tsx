import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";

import MainPage from "./pages/MainPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import OAuthRedirectRoute from "./pages/OAuthRedirectRoute.tsx";
import { registerServiceWorker } from "./services/registerServiceWorker.ts";
import { handleAllowNotification } from "./services/notificationPermission.ts";
import { useAuthStore } from "./store/useAuthStore.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/oauth/:provider",
        element: <OAuthRedirectRoute />,
      },
      {
        path: "/form",
        element: (
          <ProtectedRoute>
            <FormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

// 서비스 워커 등록
registerServiceWorker();

// 로그인 여부 체크하고 FCM 토큰 없는 경우 FCM 토큰 발급 처리
const { accessToken } = useAuthStore.getState();
if (accessToken && !localStorage.getItem("fcmToken")) {
  (async () => {
    await handleAllowNotification();
  })();
}
