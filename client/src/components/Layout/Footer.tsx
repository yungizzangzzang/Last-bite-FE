import Cookies from "js-cookie";
import { BiBell, BiSolidBellRing } from "react-icons/bi";
import { BsHouseHeart, BsHouseHeartFill } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-[56px] items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigate("/")}
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
        onClick={() => {
          const user = localStorage.getItem("user");
          if (!user || !Cookies.get("Authorization")) {
            if (
              window.confirm(
                "로그인이 필요한 페이지입니다. 로그인 하시겠습니까?"
              )
            ) {
              return navigate("/login");
            }
          }
          navigate("/mypage");
        }}
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
        onClick={() => {
          const user = localStorage.getItem("user");
          if (!user || !Cookies.get("Authorization")) {
            if (
              window.confirm(
                "로그인이 필요한 페이지입니다. 로그인 하시겠습니까?"
              )
            ) {
              return navigate("/login");
            }
          }
          navigate("/basket");
        }}
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
        onClick={() => {
          const user = localStorage.getItem("user");
          if (!user || !Cookies.get("Authorization")) {
            if (
              window.confirm(
                "로그인이 필요한 페이지입니다. 로그인 하시겠습니까?"
              )
            ) {
              return navigate("/login");
            }
          }
          navigate("/notification");
        }}
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
        onClick={() => {
          const user = localStorage.getItem("user");
          if (!user || !Cookies.get("Authorization")) {
            if (
              window.confirm(
                "로그인이 필요한 페이지입니다. 로그인 하시겠습니까?"
              )
            ) {
              return navigate("/login");
            }
          }
          navigate("/history");
        }}
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
