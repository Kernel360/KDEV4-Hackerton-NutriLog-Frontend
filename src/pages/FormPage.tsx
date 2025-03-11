import { TextField, Button, Switch, IconButton } from "@mui/material";
import { Plus, CircleX } from "lucide-react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import useSupplementScheduleStore from "../store/useSupplementScheduleStore";

const FormPage = () => {
  const {
    name, setName,
    notify, setNotify,
    selectedDays, setSelectedDays,
    dosageTimes, setDosageTimes,
    addSupplementSchedule
  } = useSupplementScheduleStore();

  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const englishDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  const handleDaySelect = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const addTime = () => {
    setDosageTimes([...dosageTimes, dayjs()]); 
  };

  const removeTime = (index: number) => {
    setDosageTimes(dosageTimes.filter((_, i) => i !== index));
  };

  const updateTime = (index: number, newTime: Dayjs) => {
    setDosageTimes(
      dosageTimes.map((time, i) => (i === index ? newTime : time))
    );
  };

  const handleSubmit = () => {
    const daysOfWeek = selectedDays.map(day => englishDays[days.indexOf(day)]);

    const scheduledTime = dosageTimes.map(time => time.format("HH:mm"));

    addSupplementSchedule(name, daysOfWeek, scheduledTime, notify);
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

        <div className="mb-4">
          <p className="font-medium">복용 시간</p>
          {dosageTimes.map((time, index) => (
            <div key={index} className="flex items-center gap-5 my-2">
              <TimePicker
                value={time}
                onChange={newValue => updateTime(index, newValue!)}
                className="w-full"
              />
              <IconButton onClick={() => removeTime(index)}>
                <CircleX size={20} />
              </IconButton>
            </div>
          ))}
          <Button
            startIcon={<Plus size={20} />}
            onClick={addTime}
            className="mt-2"
          >
            시간 추가
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="font-medium">알림 받기</p>
          <Switch
            checked={notify}
            onChange={e => setNotify(e.target.checked)}
          />
        </div>

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          저장하기
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default FormPage;
