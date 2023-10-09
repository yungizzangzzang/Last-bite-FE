import { useNavigate, useLocation } from "react-router-dom";
import { BsHouseHeart, BsHouseHeartFill } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { BiBell, BiSolidBellRing } from "react-icons/bi";
import { IoDocumentTextOutline, IoDocumentText } from "react-icons/io5";

function Footer() {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-[56px] items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/")}
        className="cursor-pointer w-1/5 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/" ? (
          <BsHouseHeartFill size={28} />
        ) : (
          <BsHouseHeart size={28} />
        )}
        <span className="text-[0.5rem]">홈</span>
      </div>
      <div
        onClick={() => navigator("/mypage")}
        className="cursor-pointer w-1/5 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/mypage" ? (
          <GoHeartFill size={28} />
        ) : (
          <GoHeart size={28} />
        )}
        <span className="text-[0.5rem]">마이페이지</span>
      </div>
      <div
        onClick={() => navigator("/basket")}
        className="cursor-pointer w-1/5 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/basket" ? (
          <HiShoppingCart size={28} />
        ) : (
          <HiOutlineShoppingCart size={28} />
        )}
        <span className="text-[0.5rem]">장바구니</span>
      </div>
      <div
        onClick={() => navigator("/notification")}
        className="cursor-pointer w-1/5 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/notification" ? (
          <BiSolidBellRing size={28} />
        ) : (
          <BiBell size={28} />
        )}
        <span className="text-[0.5rem]">알림</span>
      </div>
      <div
        onClick={() => navigator("/history")}
        className="cursor-pointer w-1/5 h-full flex flex-col gap-[2px] flex-1 justify-center items-center"
      >
        {location.pathname === "/history" ? (
          <IoDocumentText size={28} />
        ) : (
          <IoDocumentTextOutline size={28} />
        )}
        <span className="text-[0.5rem]">예약 내역</span>
      </div>
    </div>
  );
}

export default Footer;
