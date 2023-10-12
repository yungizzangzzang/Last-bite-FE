import { AiOutlineSetting, AiTwotoneSetting } from "react-icons/ai";
import { BiBell, BiSolidBellRing } from "react-icons/bi";
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";
import { RiUserHeartFill, RiUserHeartLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../states/userState";

function OwnerFooter() {
  const navigator = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userInfoState);
  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-[56px] items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator(`/owner/${user.storeId || 1}`)}
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
        onClick={() => navigator(`/owner/store/${user.storeId || 1}`)}
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
        onClick={() => navigator(`/owner/notification/${user.storeId || 1}`)}
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
