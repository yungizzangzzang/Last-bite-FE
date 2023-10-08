import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function OwnerNotification() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default OwnerNotification;

function Header() {
  return (
    <div className="flex h-[5%] items-center gap-6 border-b-2 border-[#C3CFD9] px-2">
      {"<  예약 알림"}
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const alarms = [
    {
      nickname: "윤기짱짱",
      price: "14000",
      createdAt: "10월 07일 20:00",
    },
    {
      nickname: "윤기짱짱",
      price: "19000",
      createdAt: "10월 07일 19:48",
    },
    {
      nickname: "윤기짱짱",
      price: "12000",
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
              <div className="text-[1.25rem] font-semibold">
                {alarm.nickname}
              </div>
              <div className="text-[1rem]">{alarm.price}원</div>
              <div className="text-[0.5rem]">{alarm.createdAt}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
