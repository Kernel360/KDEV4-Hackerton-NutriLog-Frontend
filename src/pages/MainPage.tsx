import { useState, useEffect } from "react";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ChevronRight, ChevronLeft } from "lucide-react"; // lucide-react 아이콘 불러오기

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Default to today
  const [checked, setChecked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  // 각 날짜에 해당하는 영양제 시간 설정
  const supplements = [
    {
      name: "비타민C",
      time: "08:00",
      memo: "공복에 복용",
      days: ["월", "수", "금"],
      checked: false,
    },
    {
      name: "오메가3",
      time: "12:00",
      memo: "식후 복용",
      days: ["화", "목", "일"],
      checked: false,
    },
    {
      name: "멀티비타민",
      time: "18:00",
      memo: "식사와 함께 복용",
      days: ["수", "토"],
      checked: false,
    },
  ];

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
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? dayjs(dateRange[0]).subtract(1, "day")
        : dayjs(dateRange[6]).add(1, "day");
    setDateRange(generateDateRange(newDate));
  };

  const handleCheckChange = (index: number) => {
    setChecked(prev => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
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
                <span className="text-xs">
                  {date.format("MM/DD")}
                </span>
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

            {supplements
              .filter(supplement =>
                supplement.days.includes(days[selectedDate.day()])
              ) // 날짜 필터링
              .map((supplement, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{supplement.name}</span>
                    <span className="text-sm text-gray-600">
                      알림 시간: {supplement.time}
                    </span>
                    <span className="text-xs text-gray-500">
                      {supplement.memo}
                    </span>
                  </div>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked[index]}
                        onChange={() => handleCheckChange(index)}
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
