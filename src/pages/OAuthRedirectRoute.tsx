import { useLocation } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";
import { useEffect } from "react";

type Provider = "KAKAO" | "GOOGLE";

// OAuth 인증 후 리디렉션 처리
const OAuthRedirectRoute = () => {
  const location = useLocation();
  const { login } = useAuth(); // 로그인 상태 관리
  // 쿼리 파라미터에서 code 값을 추출
  const params = new URLSearchParams(location.search);
  const provider = location.pathname.split("/")[2]; // /oauth/{provider}에서 {provider} 추출
  const code = params.get("code");

  useEffect(() => {
    if (code && provider) {
      login(code, provider.toUpperCase() as Provider); // 로그인 처리
    }
  }, [code, provider, login]);

  return <div>로그인 중...</div>;
};

export default OAuthRedirectRoute;
