import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { basketState } from "../states/basketState";
import { styles } from "../utils/style";

function Result() {
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
  return (
    <div className="flex flex-col p-4">
      <div className="font-semibold text-[#FF385C]">예약이 완료되었어요!</div>
      <div className="flex gap-10 font-bold ">
        <div className="text-[1.25rem]">종훈 떡볶이</div>
        <div className="bg-[#FF385C] text-white px-2 flex items-center">
          {discountPercentage}% 할인 받음
        </div>
      </div>
      <div>예약일시</div>
      <div>주문번호</div>
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
            <div className="flex flex-col p-4 border-b-2 border-[#C3CFD9]">
              <div>
                {item.name} {item.count}개
              </div>
              <div>{item.price * item.count}원</div>
            </div>
          );
        })}
      </div>
      <div className="p-4 font-bold text-[1.25rem]">
        결제 포인트 {totalPrice}원
      </div>
    </>
  );
}
