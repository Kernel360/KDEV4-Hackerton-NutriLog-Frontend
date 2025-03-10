import { useState } from "react";
import { TextField, Button, Switch, IconButton } from "@mui/material";
import { Plus, CircleX } from "lucide-react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const FormPage = () => {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [notify, setNotify] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dosageTimes, setDosageTimes] = useState<
    { day: string; times: Dayjs[] }[]
  >([]);

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  // 요일 선택 핸들러
  const handleDaySelect = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
      setDosageTimes(dosageTimes.filter(d => d.day !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
      setDosageTimes([...dosageTimes, { day, times: [] }]);
    }
  };

  // 특정 요일에 복용 시간 추가
  const addTimeForDay = (day: string) => {
    setDosageTimes(
      dosageTimes.map(d =>
        d.day === day ? { ...d, times: [...d.times, dayjs()] } : d
      )
    );
  };

  // 특정 요일에서 복용 시간 제거
  const removeTimeForDay = (day: string, index: number) => {
    setDosageTimes(
      dosageTimes.map(d =>
        d.day === day
          ? { ...d, times: d.times.filter((_, i) => i !== index) }
          : d
      )
    );
  };

  // 복용 시간 업데이트
  const updateTimeForDay = (day: string, index: number, newTime: Dayjs) => {
    setDosageTimes(
      dosageTimes.map(d =>
        d.day === day
          ? {
              ...d,
              times: d.times.map((t, i) => (i === index ? newTime : t)),
            }
          : d
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mx-auto p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">영양제 복용 관리</h2>

        <TextField
          label="영양제 이름"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="mb-4">
          <p className="font-medium mb-2 w-full">복용 요일 선택</p>
          <div className="flex gap-2 w-full">
            {days.map(day => (
              <Button
                key={day}
                variant={selectedDays.includes(day) ? "contained" : "outlined"}
                onClick={() => handleDaySelect(day)}
                style={{
                  padding: "3",
                  minWidth: "auto",
                  width: "100%",
                }}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {dosageTimes.map(({ day, times }) => (
          <div key={day} className="mb-4 w-full flex flex-col">
            <p className="font-medium">{day}요일 복용 시간</p>
            {times.map((time, index) => (
              <div key={index} className="flex items-center  gap-5 my-2">
                <TimePicker
                  value={time}
                  onChange={newValue => updateTimeForDay(day, index, newValue!)}
                  className="w-full"
                />
                <IconButton onClick={() => removeTimeForDay(day, index)}>
                  <CircleX size={20} />
                </IconButton>
              </div>
            ))}
            <Button
              startIcon={<Plus size={20} />}
              onClick={() => addTimeForDay(day)}
            >
              추가
            </Button>
          </div>
        ))}

        <TextField
          label="메모"
          fullWidth
          variant="outlined"
          className="mb-4"
          multiline
          rows={3}
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />

        <div className="flex items-center justify-between mb-4">
          <p className="font-medium">알림 받기</p>
          <Switch
            checked={notify}
            onChange={e => setNotify(e.target.checked)}
          />
        </div>

        <Button variant="contained" color="primary" fullWidth>
          저장하기
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default FormPage;
