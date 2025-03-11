import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, isAccessTokenValid } from "../../store/useAuthStore";

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // 현재 경로가 변경될 때마다 토큰 유효성 검사
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    console.log(isAccessTokenValid());
    if (accessToken && !isAccessTokenValid()) {
      // 토큰이 만료된 경우 로그아웃 처리
      logout();
    }
  }, [location.pathname, logout]);

  // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
  if (!localStorage.getItem("access_token") || !isAccessTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
