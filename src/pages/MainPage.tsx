import { useState, useEffect } from "react";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ChevronRight, ChevronLeft } from "lucide-react"; // lucide-react 아이콘 불러오기
import axios from "axios";
import { useSupplementStore } from "../store/useSupplementStore";

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Default to today
  const { searchSupplementHistorys, apiSupplements } = useSupplementStore(); // Zustand store에서 상태 가져오기

  const days = [ "일", "월", "화", "수", "목", "금", "토"];

  // 오늘 날짜를 기준으로 6일의 날짜 배열 만들기
  const generateDateRange = (currentDate: Dayjs) => {
    const range = [];
    for (let i = -3; i <= 3; i++) {
      range.push(currentDate.add(i, "day"));
    }
    return range;
  };

  const [dateRange, setDateRange] = useState(generateDateRange(dayjs()));

  useEffect(() => {
    setSelectedDate(dayjs()); // On component mount, set the current date as selected
  }, []);

  const handleDayClick = (date: Dayjs) => {
    setSelectedDate(date);
    // 상태관리 파일(useSupplementStore.js)에 구현된 API 호출
    searchSupplementHistorys(date);
    // const month = date.format("MM"); // 월
    // const day = date.format("DD"); // 일
    // const token = localStorage.getItem("access_token");
    
    // axios.get(
    //   `${import.meta.env.VITE_BASE_SERVER_URL}/api/supplements/${month}/${day}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // ) // 백엔드 API 엔드포인트 호출
    //   .then((response) => {
    //     console.log("API 응답 데이터:", response.data); // 응답 데이터 콘솔에 출력
    //     setApiSupplements(response.data); // API 응답 데이터를 state에 저장
    //     // 응답 데이터를 state에 저장하거나, 화면에 표시하는 로직 구현
    //   })
    //   .catch((error) => {
    //     console.error("API 요청 에러:", error); // 에러 발생 시 콘솔에 에러 메시지 출력
    //     // 사용자에게 에러를 알리거나, 에러 처리 로직 구현
    //   });
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? dayjs(dateRange[0]).subtract(1, "day")
        : dayjs(dateRange[6]).add(1, "day");
    setDateRange(generateDateRange(newDate));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col w-full h-screen p-4">
        <div className="flex items-center justify-around mb-4 w-full gap-2">
          <Button
            onClick={() => handleArrowClick("prev")}
            style={{
              padding: "0",
              minWidth: "auto",
              width: "100%",
            }}
          >
            <ChevronLeft />
          </Button>
          {dateRange.map((date, index) => (
            <div key={index} className="flex flex-col items-center">
              <Button
                variant={
                  selectedDate && selectedDate.isSame(date, "day")
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handleDayClick(date)}
                className="flex flex-col"
                style={{
                  padding: "4px",
                  minWidth: "auto",
                  width: "auto",
                  fontSize: "12px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {days[date.day()]}
                <span className="text-xs">{date.format("MM/DD")}</span>
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleArrowClick("next")}
            style={{
              padding: "0",
              minWidth: "auto",
              width: "100%",
            }}
          >
            <ChevronRight />
          </Button>
        </div>

        {selectedDate && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl mb-2">
              선택된 날짜: {selectedDate.format("YYYY-MM-DD")}
            </h3>

            {apiSupplements.map((supplement) => (
              <div
                key={supplement.historyId}
                className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {supplement.supplementName}
                  </span>
                  <span className="text-sm text-gray-600">
                    알림 시간: {supplement.scheduleTime}
                  </span>
                </div>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={supplement.checked || false}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        const historyId = supplement.historyId;
                        fetch(
                          `${
                            import.meta.env.VITE_BASE_SERVER_URL
                          }/api/supplements/history/${historyId}?status=${
                            isChecked ? "TAKEN" : "UNTAKEN"
                          }`, // 쿼리 파라미터로 status 값을 전달
                          {
                            method: "PATCH",
                          }
                        );
                      }}
                    />
                  }
                  label="복용 완료"
                />
              </div>
            ))}
          </div>
        )}  
      </div>
    </LocalizationProvider>
  );
};

export default MainPage;
