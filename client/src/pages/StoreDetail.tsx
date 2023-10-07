import React from "react";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function StoreDetail() {
  return (
    <Layout>
      <Header />
      <Body />
      <div className="w-[672px] fixed bottom-12 h-12 flex justify-center items-center">
        <button className="w-[60%] h-10 bg-white">장바구니 담기</button>
      </div>
      <Footer />
    </Layout>
  );
}

export default StoreDetail;

function Header() {
  return <div>가게이름</div>;
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
      {items.map((item: any, index: number) => (
        <div className="w-full h-[15%] flex p-2">
          <div className="h-full w-[80%] flex flex-col justify-center gap-1">
            <div>{item.title}</div>
            <div>{item.content}</div>
            <div>잔여수량: {item.count}</div>

            <div className="flex gap-2 items-center">
              <div>{item.prevPrice}</div>
              <div>{item.price}</div>
              <div className="flex gap-2 bg-white py-1 px-2">
                <button>-</button>
                <div>0</div>
                <button>+</button>
              </div>
            </div>
          </div>

          <div className="h-full w-[20%] bg-blue-400">사진</div>
        </div>
      ))}
    </>
  );
}
