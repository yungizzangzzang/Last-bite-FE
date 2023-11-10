import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function OwnerResult() {
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
  return (
    <Layout>
      <Header />
      <Body />
      <OwnerFooter />
    </Layout>
  );
}

export default OwnerResult;

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
  return (
    <div className={`h-full ${styles.headerMargin}`}>
      <BodyHeader />
      <BodyMain />
      <div className="p-4 font-bold text-[1.25rem]">결제 포인트 14000원</div>
    </div>
  );
}

function BodyHeader() {
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="font-semibold text-[#FF385C]">예약이 완료되었어요!</div>
        <div className="flex gap-10 font-bold ">
          <div className="text-[1.25rem]">윤기짱짱</div>
        </div>
        <div>예약일시</div>
        <div>주문번호</div>
      </div>
    </>
  );
}

function BodyMain() {
  const items = [
    { title: "로제 떡볶이", count: 1, price: 4000 },
    { title: "새우 튀김", count: 2, price: 10000 },
  ];
  return (
    <div className="border-y-8">
      {items.map((item: any) => {
        return (
          <div className="flex flex-col p-4 border-b-2 border-[#C3CFD9]">
            <div>
              {item.title} {item.count}개
            </div>
            <div>{item.price.toLocaleString("ko-KR")}원</div>
          </div>
        );
      })}
    </div>
  );
}
