import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
import ButtonWithIcon from "../components/button/ButtonWithIcon";

const LoginPage = () => {
  const onGoogleLogin = () => {
    // 구글 로그인 버튼 클릭 시 이동하는 경로 지정
    const params = new URLSearchParams({
      scope: "email profile",
      response_type: "code",
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    });
    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = GOOGLE_URL; // 구글 OAuth 로그인 페이지로 이동
  };

  const onKakaoLogin = () => {
    // 카카오 로그인 버튼 클릭 시 이동하는 경로 지정
    const params = new URLSearchParams({
      response_type: "code",
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
    });
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

    window.location.href = KAKAO_URL; // 카카오 OAuth 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <img
        src="/nutrilog_logo.png"
        alt="Nutrilog Logo"
        className="w-40 h-40 mb-10" // Increased size and margin
      />
      <div className="flex flex-col gap-4 items-center w-full max-w-xs">
        <ButtonWithIcon
          onClick={onKakaoLogin}
          className="bg-yellow-400 text-[#3B1E1E] hover:bg-yellow-500"
          icon={<SiKakaotalk size={24} />}
        >
          Kakao 로그인
        </ButtonWithIcon>
        <ButtonWithIcon
          onClick={onGoogleLogin}
          className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          icon={<FcGoogle size={24} />}
        >
          Google 로그인
        </ButtonWithIcon>
      </div>
    </div>
  );
};

export default LoginPage;
