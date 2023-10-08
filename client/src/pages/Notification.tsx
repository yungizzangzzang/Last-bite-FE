import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Notification() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Notification;

function Header() {
  return (
    <div className="flex h-[5%] items-center gap-6 border-b-2 border-[#C3CFD9] px-2">
      {"<  핫딜 알림"}
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const alarms = [
    {
      title: "종훈 떡볶이 마감 할인",
      content: "종훈 떡볶이 3000원, 로제 떡볶이 4000원",
      createdAt: "10월 07일 20:00",
    },
    {
      title: "찬호 편의점 핫딜",
      content: "1시간 한정! 유통기한 임박상품 50%할인",
      createdAt: "10월 07일 19:48",
    },
    {
      title: "승일 베이커리 마감 핫딜",
      content: "인기상품 초코소라빵 40% 할인!!!",
      createdAt: "10월 07일 19:40",
    },
  ];
  return (
    <>
      <div className="overflow-auto">
        {alarms.map((alarm: any, index: number) => {
          return (
            <div
              onClick={() => navigate("/store/1")}
              className={`cursor-pointer flex flex-col border-b-2 border-[#C3CFD9] p-4 gap-2
            ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
            >
              <div className="text-[1.25rem] font-semibold">{alarm.title}</div>
              <div className="text-[1rem]">{alarm.content}</div>
              <div className="text-[0.5rem]">{alarm.createdAt}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
