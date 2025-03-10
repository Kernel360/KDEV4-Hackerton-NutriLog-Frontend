import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 액세스 토큰 관리 유틸 함수
export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

// 액세스 토큰이 유효한지 검사하는 함수 (만료 확인 로직 필요)
export const isAccessTokenValid = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload 디코딩
    const exp = payload.exp * 1000; // 만료 시간 (ms 단위)
    return Date.now() < exp;
  } catch (error) {
    return false;
  }
};

// 유저 상태 및 로그인 관련 Zustand 스토어
interface AuthState {
  id: string | null;
  nickname: string | null;
  accessToken: string | null;
  login: (code: string, provider: "KAKAO" | "GOOGLE") => Promise<void>;
  logout: () => void;
}

// Zustand 스토어 생성
export const useAuth = create<AuthState>((set) => {
  const initialAccessToken = getAccessToken(); // 로컬 스토리지에서 액세스 토큰을 가져옴
  return {
    id: null,
    nickname: null,
    accessToken: initialAccessToken,

    login: async (code, provider) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            code,
            provider,
          }
        );

        const { accessToken, user } = response.data; // API 응답에서 사용자 정보와 토큰을 가져옴

        if (accessToken && user) {
          setAccessToken(accessToken); // 액세스 토큰 저장
          set({ id: user.id, nickname: user.nickname, accessToken }); // Zustand에 유저 정보 저장
          window.location.href = "/"; // 메인 페이지로 이동
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    },

    logout: () => {
      removeAccessToken(); // 액세스 토큰 삭제
      set({ id: null, nickname: null, accessToken: null }); // Zustand 상태 초기화
      window.location.href = "/login"; // 로그인 페이지로 이동
    },
  };
});

// 로그인 여부를 확인하고 라우팅 처리하는 훅
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  useEffect(() => {
    if (accessToken && isAccessTokenValid()) {
      navigate("/"); // 메인 페이지로 이동
    } else {
      logout(); // 액세스 토큰 만료 시 로그아웃 처리
    }
  }, [navigate, accessToken, logout]);
};
