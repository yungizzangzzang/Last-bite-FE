import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function History() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default History;

function Header() {
  return (
    <div className="flex h-[5%] items-center gap-6 border-b-2 border-[#C3CFD9] px-2">
      예약 내역
    </div>
  );
}

function Body() {
  return (
    <>
      <BodyMain />
    </>
  );
}

function BodyMain() {
  const navigate = useNavigate();
  const items = [
    {
      title: "로제 떡볶이",
      count: 1,
      price: 4000,
      discount: 22,
      star: null,
      imgUrl: "",
      createdAt: "2023.10.07",
      store: {
        name: "종훈 떡볶이",
        description: "순대는 없어요",
      },
    },
    {
      title: "새우 튀김",
      count: 2,
      price: 10000,
      discount: 49,
      star: 5,
      imgUrl: "",
      createdAt: "2023.10.04",
      store: {
        name: "윤기네 치킨",
        description: "후라이드 맛집",
      },
    },
    {
      title: "포테이토 피자",
      count: 1,
      price: 12000,
      discount: 26,
      star: 4,
      imgUrl: "",
      createdAt: "2023.10.03",
      store: {
        name: "승일 피자",
        description: "파스타 맛집",
      },
    },
  ];
  return (
    <div className=" overflow-auto">
      {items.map((item: any) => {
        return (
          <div className="flex flex-col p-4 border-b-8 border-[#C3CFD9] gap-2">
            <div>{item.createdAt} 예약 완료</div>
            <div className="flex justify-between items-center pr-10">
              <div className="flex items-center gap-2">
                <div className="w-[160px] h-[160px] flex justify-center items-center bg-rose-400">
                  사진
                </div>
                <div className="flex flex-col">
                  <div>{item.store.name}</div>
                  <div>{item.store.description}</div>
                  <div className="bg-[#FF385C] text-white px-1">
                    {item.discount}% 할인받음
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/result");
                }}
              >
                {">"}
              </button>
            </div>
            {item.star ? (
              "⭐️".repeat(item.star)
            ) : (
              <button
                onClick={() => {
                  navigate("/create-review");
                }}
                className="w-[80%] h-8 flex items-center bg-[#FF385C] text-white justify-center self-center"
              >
                리뷰 작성
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}