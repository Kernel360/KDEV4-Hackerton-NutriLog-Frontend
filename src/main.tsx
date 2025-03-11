import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";

import MainPage from "./pages/MainPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import OAuthRedirectRoute from "./pages/OAuthRedirectRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
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
        element: <FormPage />,
      },
      {
        path: "/my",
        element: <MyPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} /> {/* RouterProvider로 라우터 적용 */}
  </>
);
