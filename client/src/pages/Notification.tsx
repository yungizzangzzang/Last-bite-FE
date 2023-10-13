import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

function Notification() {
  const navigate = useNavigate();

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
    <div
      className={`w-full overflow-auto ${styles.headerMargin} ${styles.bottomMargin}`}
    >
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
  );
}
