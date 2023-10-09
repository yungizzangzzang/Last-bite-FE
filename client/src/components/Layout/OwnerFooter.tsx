import { useNavigate } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiUserHeartLine } from "react-icons/ri";
import { BiBell } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

function OwnerFooter() {
  const navigator = useNavigate();
  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-10 items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/owner")}
        className="cursor-pointer w-1/4 h-full flex flex-1 justify-center items-center"
      >
        <IoDocumentTextOutline size={28} />
      </div>
      <div
        onClick={() => navigator("/store-info")}
        className="cursor-pointer w-1/4 h-full flex flex-1 justify-center items-center"
      >
        <RiUserHeartLine size={28} />
      </div>
      <div
        onClick={() => navigator("/owner/notification")}
        className="cursor-pointer w-1/4 h-full flex flex-1 justify-center items-center"
      >
        <BiBell size={28} />
      </div>
      <div
        onClick={() => navigator("/owner/setting")}
        className="cursor-pointer w-1/4 h-full flex flex-1 justify-center items-center"
      >
        <AiOutlineSetting size={28} />
      </div>
    </div>
  );
}

export default OwnerFooter;
