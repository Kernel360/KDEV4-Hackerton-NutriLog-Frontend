import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; 
import "./index.css";

import App from "./App.tsx";

import MainPage from "./pages/MainPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MyPage from "./pages/MyPage.tsx"


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
  <StrictMode>
    <RouterProvider router={router} /> {/* RouterProvider로 라우터 적용 */}
  </StrictMode>
);
