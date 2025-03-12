import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MoreVertical } from "lucide-react";
import { useSupplementStore } from "../store/useSupplementStore"; // Zustand store import

const MyPage = () => {
  const { supplements, fetchSupplements, deleteSupplement } =
    useSupplementStore(); // Zustand store에서 상태 가져오기
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchSupplements(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [fetchSupplements]);

  const handleOpenModal = (index: number) => {
    setSelectedSupplement(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSupplement(null);
  };

  const handleDelete = () => {
    if (selectedSupplement !== null) {
      deleteSupplement(supplements[selectedSupplement].id); // supplementId를 이용해 삭제
      setOpenModal(false);
      setSelectedSupplement(null);
    }
  };

  const handleEdit = () => {
    setOpenModal(false);
    setSelectedSupplement(null);
  };

  const supplementList = Array.isArray(supplements) ? supplements : [];

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

          {supplementList.length > 0 ? (
            supplementList.map((supplement, index) => (
              <div
                key={supplement.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div className="flex flex-col">
                  <Typography variant="body1" className="font-semibold">
                    {supplement.name}
                  </Typography>
                </div>
                <div className="flex items-center">
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
            ))
          ) : (
            <Typography variant="body1" className="text-gray-500">
              현재 복용 중인 약이 없습니다.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>약 정보</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {supplementList[selectedSupplement!]?.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            삭제
          </Button>
          <Button onClick={handleEdit} color="primary">
            수정
          </Button>
          <Button onClick={handleCloseModal}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPage;
