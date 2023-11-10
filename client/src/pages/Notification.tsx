import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import NotFound from "../components/NotFound";
import { SocketContext } from "../contexts/SocketContext";
import { styles } from "../utils/style";

function Notification() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<any[]>([]);
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
  }, [navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("itemRegistered", (item) => {});

      socket.on("alarmToFavoriteClient", (alarm) => {
        setAlarms((currentAlarms) => [...currentAlarms, alarm]);
      });

      return () => {
        socket.off("itemRegistered");
        socket.off("alarmToFavoriteClient");
      };
    }
  }, [navigate, socket]);

  return (
    <Layout>
      <Header />
      <Body alarms={alarms} />
      <Footer />
    </Layout>
  );
}

export default Notification;

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
      핫딜 알림
    </div>
  );
}

function Body({ alarms }: { alarms: any }) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full overflow-auto ${styles.headerMargin} ${styles.bottomMargin}`}
    >
      {alarms.length ? (
        <>
          {alarms.map((alarm: any, index: number) => {
            const utcDate = new Date(alarm.createdAt);

            // 현지 시간으로 변환
            utcDate.setMinutes(utcDate.getMinutes());

            // 원하는 형식으로 포맷
            const formattedCreatedAt = `${utcDate.getFullYear()}.${
              utcDate.getMonth() + 1
            }.${utcDate.getDate()} ${utcDate.getHours()}시 ${utcDate.getMinutes()}분`;

            return (
              <div
                onClick={() => navigate(`/store/${alarm.storeId}`)}
                className={`cursor-pointer flex flex-col border-b-2 border-[#C3CFD9] p-4 gap-2
            ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
              >
                <div className="text-[1.25rem] font-semibold">
                  {alarm.title}
                </div>
                <div className="text-[14px]">{alarm.content}</div>
                <div className="text-[0.5rem] text-[#717171]">
                  {formattedCreatedAt}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className={`h-screen pb-[52px]`}>
          <NotFound content="핫딜 진행중인 단골가게가 없어요!" />
        </div>
      )}
    </div>
  );
}
