import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Nearby() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Nearby;

function Header() {
  return (
    <div className="border-b-2 border-[#C3CFD9] px-2 h-[5%] flex items-center">
      X 내 주변 핫딜
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const nearbyStore = [
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
      <div className="w-full h-full mb-[38px] overflow-auto">
        {nearbyStore.map((item: any, index: number) => (
          <div
            onClick={() => navigate("/store/1")}
            className={`w-full h-1/5 p-2 flex items-center border-b-2 gap-2 border-[#C3CFD9] ${
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
      </div>
    </>
  );
}
