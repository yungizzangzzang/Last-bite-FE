import React from "react";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Favorite() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Favorite;

function Header() {
  return (
    <div className="h-10 flex items-center w-full px-2 border-b-2">
      X 단골 가게 핫딜
    </div>
  );
}

function Body() {
  const favoriteStore = [
    {
      imgUrl: "",
      title: "종훈 떡볶이 마감 할인",
      content: "종훈 떡볶이 3000원",
    },
    {
      imgUrl: "",
      title: "희재 피자 마감 할인",
      content: "포테이토피자 한 판 13000원",
    },
    {
      imgUrl: "",
      title: "찬호 편의점 마감 할인",
      content: "치킨 7000원",
    },
  ];
  return (
    <>
      {favoriteStore.map((item: any, index: number) => (
        <div
          className={`w-full h-1/5 p-2 flex items-center border-b-2 gap-2 ${
            index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"
          }`}
        >
          <div className="w-[25%] h-full bg-blue-300">{item.imgurl}</div>
          <div>
            <div>{item.title}</div>
            <div>{item.content}</div>
          </div>
        </div>
      ))}
    </>
  );
}
