import { create } from "zustand";
import axios from "axios";
import { Dayjs } from "dayjs";

interface Supplement {
  id: number;
  name: string;
  time?: string;
  memo?: string;
}

interface SupplementStore {
  supplements: Supplement[];
  apiSupplements: any[];
  fetchSupplements: () => void;
  deleteSupplement: (supplementId: number) => void;
  searchSupplementHistorys: (date : Dayjs) => void;
  setApiSupplements: (apiSupplements: any[]) => void;
}

export const useSupplementStore = create<SupplementStore>((set) => ({
  supplements: [],
  apiSupplements: [],
  /** 선택한 날짜의 SuppplementHistory 조회 */
  
  searchSupplementHistorys: async (date: Dayjs) => {
    const month = date.format("MM"); // 월
    const day = date.format("DD"); // 일
    const token = localStorage.getItem("access_token");
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/supplements/${month}/${day}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API 응답 데이터:", response.data);
      set({ apiSupplements: response.data }); // API 응답 데이터를 state에 저장
    } catch (error) {
      console.error("API 요청 에러:", error);
      set({ apiSupplements: [] }); // API 응답 데이터를 state에 저장
    }
  },
  

  fetchSupplements: async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/supplements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      set({ supplements: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching supplements:", error);
      set({ supplements: [] });
    }
  },
  deleteSupplement: async (supplementId: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_SERVER_URL
        }/api/supplements/schedules/${supplementId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        supplements: state.supplements.filter(
          (supplement) => supplement.id !== supplementId
        ),
      }));

      console.log(`Supplement with id ${supplementId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting supplement:", error);
    }
  },
  setApiSupplements: (apiSupplements: any[]) => set({ apiSupplements }),
}));
