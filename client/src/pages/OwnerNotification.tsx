import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { SocketContext } from "../contexts/SocketContext";
import { formatCreatedAt } from "../utils/dateFormat";
import { styles } from "../utils/style";

interface Item {
  name: string;
  count: number;
}

interface Alarm {
  nickname: string;
  items: Item[];
  totalPrice: number;
  createdAt: string;
}

interface BodyProps {
  alarms: Alarm[];
}

function OwnerNotification() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
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
      socket.on("orderAlarmToOwner", (data: Alarm) => {
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

function Body({ alarms }: BodyProps) {
  return (
    <>
      <div
        className={`overflow-auto ${styles.headerMargin} ${styles.bottomMargin} h-full`}
      >
        {alarms?.map((alarm: Alarm, index: number) => {
          const formattedCreatedAt = formatCreatedAt(alarm.createdAt);
          return (
            <div
              key={alarm.createdAt}
              className={`flex flex-col border-b-2 border-[#C3CFD9] p-4 gap-2
            ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
            >
              <div className="text-[1.25rem] font-semibold">
                {alarm.nickname}
              </div>
              {alarm.items.map((item: Item) => {
                return (
                  <div>
                    <div>
                      {item.name} {item.count}개
                    </div>
                  </div>
                );
              })}
              <div className="text-[1rem]">
                결제 포인트 : {alarm.totalPrice.toLocaleString("ko-KR")}원
              </div>
              <div className="text-[0.5rem]">{formattedCreatedAt}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
