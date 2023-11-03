import React, { useContext, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  storeId,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const socket = useContext(SocketContext);

  const handleSendNotification = () => {
    const data = {
      title,
      content,
      storeId,
    };
    if (socket) {
      socket.emit("alarmToFavoriteClient", data);

      onClose();
      setTitle("");
      setContent("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" w-[300px] bg-white p-4 rounded-md space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg focus:outline-none"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold">알림 보내기</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            제목:
          </label>
          <input
            id="title"
            className="mt-1 p-2 w-full resize-none border rounded-md focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            내용:
          </label>
          <textarea
            id="message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-md mt-1 p-2 outline-none resize-none h-[100px]"
          />
        </div>
        <button
          onClick={handleSendNotification}
          className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          전송하기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
