import { useNavigate, useLocation } from "react-router-dom";
import { IoDocumentTextOutline, IoDocumentText } from "react-icons/io5";
import { RiUserHeartLine, RiUserHeartFill } from "react-icons/ri";
import { BiBell, BiSolidBellRing } from "react-icons/bi";
import { AiOutlineSetting, AiTwotoneSetting } from "react-icons/ai";

function OwnerFooter() {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-[56px] items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/owner")}
        className="cursor-pointer w-1/4 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/owner" ? (
          <IoDocumentText size={28} />
        ) : (
          <IoDocumentTextOutline size={28} />
        )}
        <span className="text-[0.5rem]">핫딜 관리</span>
      </div>
      <div
        onClick={() => navigator("/owner/store")}
        className="cursor-pointer w-1/4 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/owner/store" ? (
          <RiUserHeartFill size={28} />
        ) : (
          <RiUserHeartLine size={28} />
        )}
        <span className="text-[0.5rem]">매장 정보</span>
      </div>
      <div
        onClick={() => navigator("/owner/notification")}
        className="cursor-pointer w-1/4 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/owner/notification" ? (
          <BiSolidBellRing size={28} />
        ) : (
          <BiBell size={28} />
        )}
        <span className="text-[0.5rem]">알림</span>
      </div>
      <div
        onClick={() => navigator("/owner/setting")}
        className="cursor-pointer w-1/4 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/owner/setting" ? (
          <AiTwotoneSetting size={28} />
        ) : (
          <AiOutlineSetting size={28} />
        )}
        <span className="text-[0.5rem]">설정</span>
      </div>
    </div>
  );
}

export default OwnerFooter;
