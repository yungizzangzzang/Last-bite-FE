import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function StoreDetail() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Body />
      <div className="min-w-[336px] w-[336px] fixed bottom-9 h-12 flex justify-center items-center">
        <button
          onClick={() => navigate("/basket")}
          className="w-full h-10 text-white bg-[#FF385C]"
        >
          장바구니 담기
        </button>
      </div>
      <Footer />
    </Layout>
  );
}

export default StoreDetail;

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex h-12 items-center border-b-2 border-[#C3CFD9]">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="px-2 flex gap-2 items-center"
      >
        <AiOutlineArrowLeft />
        종훈 떡볶이
      </div>
      <button
        onClick={() => navigate("/review/1")}
        className="h-6 text-white text-[0.8rem] bg-[#FF385C] px-2"
      >
        가게 리뷰
      </button>
    </div>
  );
}

function Body() {
  const items = [
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "로제 떡볶이",
      content: "요즘 대세 떡볶이",
      count: 3,
      prevPrice: 6000,
      price: 4000,
      imgUrl: "",
    },
    {
      title: "새우 튀김",
      content: "파사삭 새우 오늘만 할인! (6ea)",
      count: 4,
      prevPrice: 6000,
      price: 5000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "로제 떡볶이",
      content: "요즘 대세 떡볶이",
      count: 3,
      prevPrice: 6000,
      price: 4000,
      imgUrl: "",
    },
    {
      title: "새우 튀김",
      content: "파사삭 새우 오늘만 할인! (6ea)",
      count: 4,
      prevPrice: 6000,
      price: 5000,
      imgUrl: "",
    },
  ];

  return (
    <>
      <div className="w-full h-full mb-20 overflow-auto">
        {items.map((item: any, index: number) => (
          <div
            className={`w-full flex items-center border-b-2 border-[#C3CFD9] p-2
             ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
          >
            <div
              className={`h-full w-[80%] flex flex-col justify-center gap-1`}
            >
              <div className="text-[1.25rem]">{item.title}</div>
              <div className="text-[0.75rem]">{item.content}</div>
              <div className="text-[0.75rem]">잔여수량: {item.count}</div>

              <div className="flex gap-2 items-center">
                <div>{item.prevPrice}</div>
                <div>{item.price}</div>
                <div className="flex gap-2 py-1 px-2">
                  <button>-</button>
                  <div>0</div>
                  <button>+</button>
                </div>
              </div>
            </div>

            <div className="h-[100px] w-[100px] border-b-2 bg-blue-400 flex items-center justify-center rounded-lg">
              사진
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
