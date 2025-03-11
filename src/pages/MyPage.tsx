import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MoreVertical } from "lucide-react";

const MyPage = () => {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );

  const supplements = [
    { name: "비타민C", time: "08:00", memo: "공복에 복용", id: 1 },
    { name: "오메가3", time: "12:00", memo: "식후 복용", id: 2 },
    { name: "멀티비타민", time: "18:00", memo: "식사와 함께 복용", id: 3 },
  ];

  const handleCheckChange = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const handleOpenModal = (index: number) => {
    setSelectedSupplement(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSupplement(null);
  };

  const handleDelete = () => {
    setOpenModal(false);
    setSelectedSupplement(null);
  };

  const handleEdit = () => {
    setOpenModal(false);
    setSelectedSupplement(null);
  };

  return (
    <div className="flex flex-col w-full h-screen p-4">
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5">회원 정보</Typography>
          <div className="flex items-center mt-2">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <Typography className="ml-4">홍길동</Typography>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" className="mb-4">
            현재 복용 중인 약
          </Typography>

          {supplements.map((supplement, index) => (
            <div
              key={supplement.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex flex-col">
                <Typography variant="body1" className="font-semibold">
                  {supplement.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  알림 시간: {supplement.time}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {supplement.memo}
                </Typography>
              </div>
              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked[index]}
                      onChange={() => handleCheckChange(index)}
                    />
                  }
                  label="알림 받기"
                />
                <Button
                  onClick={() => handleOpenModal(index)}
                  startIcon={<MoreVertical />}
                  variant="text"
                  color="primary"
                >
                  더보기
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal for Edit and Delete */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>약 정보</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            선택된 약: {supplements[selectedSupplement!]?.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            삭제
          </Button>
          <Button onClick={handleEdit} color="primary">
            수정
          </Button>
          <Button onClick={handleCloseModal} color="default">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPage;
