import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function OwnerNotification() {
  return (
    <Layout>
      <Header />
      <Body />
      <OwnerFooter />
    </Layout>
  );
}

export default OwnerNotification;

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
      예약 알림
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
      <div
        className={`overflow-auto ${styles.headerMargin} ${styles.bottomMargin} h-full`}
      >
        {alarms.map((alarm: any, index: number) => {
          return (
            <div
              onClick={() => navigate("/owner/result")}
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
