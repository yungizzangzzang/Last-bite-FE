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
    <div className="h-10 flex items-center w-full border-b-2 border-black">
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
      title: "종훈 떡볶이 마감 할인",
      content: "종훈 떡볶이 3000원",
    },
    {
      imgUrl: "",
      title: "종훈 떡볶이 마감 할인",
      content: "종훈 떡볶이 3000원",
    },
  ];
  return (
    <>
      {favoriteStore.map((item: any, index: number) => (
        <div className="w-full h-1/5 p-2 flex items-center border-b-2 border-black">
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
