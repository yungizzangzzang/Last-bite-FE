import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { styles } from "../utils/style";

function Basket() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Body />
      <button
        onClick={() => navigate("/result")}
        className={`min-w-[336px] w-[336px] fixed ${styles.footerHeight} h-20 flex flex-col justify-center items-center`}
      >
        <button className="w-full h-10 text-white bg-[#FF385C]">
          총 22% 할인받고 구매하기
        </button>
        <div className="flex justify-center items-center h-10 bg-white w-full">
          총액: 14,000원
        </div>
      </button>
      <Footer />
    </Layout>
  );
}

export default Basket;

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
      장바구니
    </div>
  );
}

function Body() {
  const items = [
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
    {
      title: "종훈 떡볶이",
      content: "매콤 달달 떡볶이, 1,000원 할인!",
      count: 12,
      prevPrice: 4000,
      price: 3000,
      imgUrl: "",
    },
  ];
  return (
    <div className={`w-full ${styles.headerMargin} mb-32 overflow-auto`}>
      {items.map((item: any, index: number) => (
        <div
          className={`w-full h-[180px] flex flex-col p-2 border-b-2 border-[#C3CFD9] pt-4       
          ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}
        `}
        >
          <div className="px-2">{item.title}</div>
          <div className="flex h-full justify-around items-center">
            <div className="h-[100px] w-[100px] rounded-md flex justify-center items-center bg-blue-400">
              사진
            </div>
            <div className="h-full w-[30%] flex flex-col justify-center">
              <div>가격: {item.price}원</div>
              <div>{item.price}원</div>
            </div>
            <div className="flex gap-2 py-1 px-2 items-center">
              <button>-</button>
              <div>0</div>
              <button>+</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
