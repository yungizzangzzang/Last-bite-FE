import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

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
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft /> 내 주변 핫딜
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
      <div
        className={`w-full h-full ${styles.headerMargin} ${styles.bottomMargin} overflow-auto`}
      >
        {nearbyStore.map((item: any, index: number) => (
          <div
            onClick={() => navigate("/store/1")}
            className={`w-full h-[12%] p-2 flex items-center border-b-2 border-[#C3CFD9] gap-2 ${
              index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"
            }`}
          >
            <div className="w-[25%] h-full bg-blue-300">{item.imgurl}</div>
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-[0.75rem]">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
