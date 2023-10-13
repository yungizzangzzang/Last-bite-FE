import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { chargePoint, fetchUser } from "../../api/authAPI";

interface ChargePointModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalRef?: React.RefObject<HTMLDivElement>;
}

function ChargePointModal({
  isOpen,
  closeModal,
  modalRef,
}: ChargePointModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    const newValue = e.target.value.replace(/,/g, "");
    if ((newValue === "" || regex.test(newValue)) && +newValue <= 10000000) {
      setInputValue(newValue);
      setFormattedValue(new Intl.NumberFormat().format(+newValue));
    }
  };
  const { refetch } = useQuery(["user"], () => fetchUser());

  const handleSubmit = async () => {
    try {
      await chargePoint(+inputValue);
      refetch();
      closeModal();
    } catch (error) {
      toast.error("포인트 충전에 실패하였습니다.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-x flex flex-col gap-[12px]">
        <div>포인트 충전하기</div>
        <input
          type="text"
          value={formattedValue}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            완료
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChargePointModal;
