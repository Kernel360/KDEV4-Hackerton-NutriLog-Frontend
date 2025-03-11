import { create } from "zustand";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

interface SupplementStore {
  name: string;
  notify: boolean;
  selectedDays: string[];
  dosageTimes: Dayjs[];
  setName: (name: string) => void;
  setNotify: (notify: boolean) => void;
  setSelectedDays: (selectedDays: string[]) => void;
  setDosageTimes: (dosageTimes: Dayjs[]) => void;
  addSupplementSchedule: (
    name: string,
    selectedDays: string[],
    dosageTimes: string[],  
    notify: boolean
  ) => Promise<void>;
}

const useSupplementStore = create<SupplementStore>((set) => ({
  name: "",
  notify: false,
  selectedDays: [],
  dosageTimes: [],
  setName: (name) => set({ name }),
  setNotify: (notify) => set({ notify }),
  setSelectedDays: (selectedDays) => set({ selectedDays }),
  setDosageTimes: (dosageTimes) => set({ dosageTimes }),

  addSupplementSchedule: async (name, selectedDays, dosageTimes, notify) => {
    try {
      const response = await axios.post("/api/supplements/schedules", {
        name,
        daysOfWeek: selectedDays, 
        scheduledTime: dosageTimes,  
        isNotificationEnabled: notify,
      });

      console.log("Response:", response);

      if (response.status === 204) {
        console.log("일정이 추가되었습니다.");
      }
    } catch (error) {
      console.error("일정 추가 실패:", error);
    }
  },
}));

export default useSupplementStore;
