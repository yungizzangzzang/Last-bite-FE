import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Basket() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Body />
      <div className="w-[672px] fixed bottom-9 h-20 flex flex-col justify-center items-center">
        <button
          onClick={() => navigate("/result")}
          className="w-full h-10 text-white bg-[#FF385C]"
        >
          총 22% 할인받고 구매하기
        </button>
        <div className="flex justify-center items-center h-10 bg-white w-full">
          총액: 14,000원
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Basket;

function Header() {
  return (
    <div className="flex h-[5%] items-center gap-6 border-b-2 border-[#C3CFD9] px-2">
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
      title: "로제 떡볶이",
      content: "요즘 대세 떡볶이",
      count: 3,
      prevPrice: 6000,
      price: 4000,
      imgUrl: "",
    },
    {
      title: "새우 튀김",
      content: "파사삭 새우 오늘만 할인! (6ea)",
      count: 4,
      prevPrice: 6000,
      price: 5000,
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
      title: "로제 떡볶이",
      content: "요즘 대세 떡볶이",
      count: 3,
      prevPrice: 6000,
      price: 4000,
      imgUrl: "",
    },
    {
      title: "새우 튀김",
      content: "파사삭 새우 오늘만 할인! (6ea)",
      count: 4,
      prevPrice: 6000,
      price: 5000,
      imgUrl: "",
    },
  ];
  return (
    <div className="w-full h-full mb-32 overflow-auto">
      {items.map((item: any, index: number) => (
        <div
          className={`w-full h-[240px] flex flex-col p-2 border-b-2 border-[#C3CFD9]         
          ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}
        `}
        >
          <div>{item.title}</div>
          <div className="flex h-full justify-around items-center">
            <div className="h-[200px] w-[200px] bg-blue-400">사진</div>
            <div className="h-full w-[30%] flex flex-col justify-center">
              <div>가격: {item.price}원</div>
              <div>{item.price}원</div>
            </div>
            <div className="w-[10%] h-[10%] flex gap-2 bg-white py-1 px-2 items-center">
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
