import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { basketState } from "../states/basketState";
import { styles } from "../utils/style";

function Result() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || !Cookies.get("Authorization")) {
      if (
        window.confirm("로그인이 필요한 페이지입니다. 로그인 하시겠습니까?")
      ) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const [, setBasket] = useRecoilState(basketState);

  useEffect(() => {
    return () => {
      setBasket([]);
    };
  }, [setBasket]);
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Result;

function Header() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft />
      예약 상세
    </div>
  );
}

function Body() {
  const items = useRecoilValue(basketState);
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  return (
    <div className={`h-full ${styles.headerMargin}`}>
      <BodyHeader totalPrice={totalPrice} />
      <BodyMain totalPrice={totalPrice} />
    </div>
  );
}

function BodyHeader({ totalPrice }: { totalPrice: number }) {
  const items = useRecoilValue(basketState);
  let totalPrevPrice = 0;
  items.forEach((item) => {
    totalPrevPrice += item.prevPrice * item.count;
  });
  const discountPercentage = Math.round(
    (1 - totalPrice / totalPrevPrice) * 100
  );

  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex w-full flex-col px-4 gap-2 py-6">
      <div className="font-semibold text-[#FF385C]">예약이 완료되었어요!</div>
      <div className="flex gap-10 font-bold items-center ">
        <div className="text-[1.25rem]">{items[0]?.storeName}</div>
        <div className="bg-[#FF385C] w-[100px] h-6 text-[0.75rem] rounded-sm text-white px-2 flex items-center justify-center">
          {discountPercentage}% 할인 받음
        </div>
      </div>
      <div className="text-[14px] text-[#717171]">
        예약일시: {year}년 {month}월 {day}일 {hours}시 {minutes}분
      </div>
    </div>
  );
}

function BodyMain({ totalPrice }: { totalPrice: number }) {
  const items = useRecoilValue(basketState);
  return (
    <>
      <div className="border-y-8">
        {items.map((item) => {
          return (
            <div className="flex flex-col p-6 border-b-2 border-[#C3CFD9]">
              <div>
                {item.name} {item.count}개
              </div>
              <div className="text-[14px]">
                {(item.price * item.count).toLocaleString("ko-KR")}원
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-6 font-bold text-[20px]">
        결제 포인트 {totalPrice.toLocaleString("ko-KR")}원
      </div>
    </>
  );
}
