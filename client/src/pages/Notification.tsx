import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { SocketContext } from "../contexts/SocketContext";
import { formatCreatedAt } from "../utils/dateFormat";
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
      socket.on("itemRegistered", (item) => {
        console.log(item);
      });

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
      {alarms.map((alarm: any, index: number) => {
        const formattedCreatedAt = formatCreatedAt(alarm.createdAt);

        return (
          <div
            onClick={() => navigate(`/store/${alarm.storeId}`)}
            className={`cursor-pointer flex flex-col border-b-2 border-[#C3CFD9] p-4 gap-2
            ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
          >
            <div className="text-[1.25rem] font-semibold">{alarm.title}</div>
            <div className="text-[14px]">{alarm.content}</div>
            <div className="text-[0.5rem] text-[#717171]">
              {formattedCreatedAt}
            </div>
          </div>
        );
      })}
    </div>
  );
}
