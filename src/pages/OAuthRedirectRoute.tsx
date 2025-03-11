import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

type Provider = "KAKAO" | "GOOGLE";

// OAuth 인증 후 리디렉션 처리
const OAuthRedirectRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore(); // 로그인 상태 관리
  // 쿼리 파라미터에서 code 값을 추출
  const params = new URLSearchParams(location.search);
  const provider = location.pathname.split("/")[2]; // /oauth/{provider}에서 {provider} 추출
  const code = params.get("code");

  useEffect(() => {
    const performLogin = async () => {
      if (code && provider) {
        try {
          await login(code, provider.toUpperCase() as Provider);
          console.log("로그인 처리 완료");
          navigate("/"); // 로그인 처리 후 메인 페이지로 이동
        } catch (error) {
          console.error("로그인 실패:", error);
          navigate("/login"); // 로그인 실패 시 로그인 페이지로 이동
        }
      }
    };

    performLogin();
  }, [code, provider, login, navigate]);

  return <div>로그인 중...</div>;
};

export default OAuthRedirectRoute;
