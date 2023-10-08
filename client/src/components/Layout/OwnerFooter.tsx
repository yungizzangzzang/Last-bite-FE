import { useNavigate } from "react-router-dom";

function OwnerFooter() {
  const navigator = useNavigate();
  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-10 items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/owner")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        핫딜 관리
      </div>
      <div
        onClick={() => navigator("/store-info")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        가게 정보
      </div>
      <div
        onClick={() => navigator("/owner-notification")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        알람
      </div>
      <div
        onClick={() => navigator("/owner-setting")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        설정
      </div>
    </div>
  );
}

export default OwnerFooter;
