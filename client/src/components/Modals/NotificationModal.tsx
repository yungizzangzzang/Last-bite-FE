import React from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" w-[300px] h-[400px] bg-white p-4 rounded-md space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg focus:outline-none"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold">알림 보내기</h2>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            제목:
          </label>
          <input className="mt-1 p-2 w-full resize-none border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            내용:
          </label>
          <textarea
            id="message"
            className="mt-1 p-2 w-full h-32 resize-none border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          전송
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
