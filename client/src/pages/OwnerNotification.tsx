import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { SocketContext } from "../contexts/SocketContext";
import { styles } from "../utils/style";

function OwnerNotification() {
  const [alarms, setAlarms] = useState<any[]>([]);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

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

    if (socket) {
      socket.on("orderAlarmToOwner", (data) => {
        console.log("주문 알림 데이터:", data);
        setAlarms((prevAlarms) => [...prevAlarms, data]);
      });
    }

    return () => {
      if (socket) {
        socket.off("orderAlarmToOwner");
      }
    };
  }, [navigate, socket]);

  return (
    <Layout>
      <Header />
      <Body alarms={alarms} />
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

function Body({ alarms }: { alarms: any }) {
  return (
    <>
      <div
        className={`overflow-auto ${styles.headerMargin} ${styles.bottomMargin} h-full`}
      >
        {alarms.map((alarm: any, index: number) => {
          return (
            <div
              className={`flex flex-col border-b-2 border-[#C3CFD9] p-4 gap-2
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
