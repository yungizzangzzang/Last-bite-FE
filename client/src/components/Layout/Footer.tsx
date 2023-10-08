import { useNavigate } from "react-router-dom";

function Footer() {
  const navigator = useNavigate();
  return (
    <div className="flex min-w-[672px] h-10 items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        홈
      </div>
      <div
        onClick={() => navigator("/mypage")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        마이페이지
      </div>
      <div
        onClick={() => navigator("/basket")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        장바구니
      </div>
      <div
        onClick={() => navigator("/notification")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        알림
      </div>
      <div
        onClick={() => navigator("/history")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        주문내역
      </div>
    </div>
  );
}

export default Footer;
