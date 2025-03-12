import { create } from "zustand";
import axios from "axios";
import { handleAllowNotification } from "../services/notificationPermission";

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
  fcmToken: string | null;
  login: (code: string, provider: "KAKAO" | "GOOGLE") => Promise<void>;
  logout: () => void;
  setFcmToken: (token: string) => void;
  sendFcmTokenToServer: (token: string) => Promise<void>;
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>((set, get) => {
  const initialAccessToken = getAccessToken(); // 로컬 스토리지에서 액세스 토큰을 가져옴
  return {
    id: null,
    nickname: null,
    accessToken: initialAccessToken,
    fcmToken: null,
    login: async (code: string, provider: "KAKAO" | "GOOGLE") => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/api/auth/login`,
          {
            code,
            provider,
          }
        );

        const { accessToken, user } = response.data; // API 응답에서 사용자 정보와 토큰을 가져옴
        console.log(accessToken, user);
        if (accessToken && user) {
          setAccessToken(accessToken); // 액세스 토큰 저장
          set({ id: user.id, nickname: user.nickname, accessToken }); // Zustand에 유저 정보 저장
          await handleAllowNotification();
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    },
    logout: () => {
      removeAccessToken(); // 액세스 토큰 삭제
      set({ id: null, nickname: null, accessToken: null }); // Zustand 상태 초기화
    },
    setFcmToken: (token: string) => set({ fcmToken: token }),

    sendFcmTokenToServer: async (token: string) => {
      const accessToken = get().accessToken;
      if (!accessToken) {
        console.error(
          "❌ 액세스 토큰이 없음, FCM 토큰을 서버에 전송할 수 없음"
        );
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/api/notifications/fcm-token`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        set({ fcmToken: token });
        console.log("✅ FCM 토큰이 서버로 전송됨:", token);
      } catch (error) {
        console.error("❌ FCM 토큰 서버 전송 실패:", error);
      }
    },
  };
});
