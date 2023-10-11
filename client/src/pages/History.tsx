import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

function History() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default History;

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
      예약 내역
    </div>
  );
}

function Body() {
  return <BodyMain />;
}

function BodyMain() {
  const navigate = useNavigate();
  const items = [
    {
      orderId: 1,
      count: 1,
      discount: 22,
      price: 4000,
      createdAt: "2023.10.07",
      store: {
        storeId: 1,
        name: "종훈 떡볶이",
      },
      item: {
        name: "로제 떡볶이",
        imgUrl: "",
      },
      review: {
        star: null,
      },
    },
    {
      orderId: 1,
      count: 1,
      discount: 22,
      price: 4000,
      createdAt: "2023.10.07",
      store: {
        storeId: 1,
        name: "종훈 떡볶이",
      },
      item: {
        name: "로제 떡볶이",
        imgUrl: "",
      },
      review: {
        star: 5,
      },
    },
    {
      orderId: 1,
      count: 1,
      discount: 22,
      price: 4000,
      createdAt: "2023.10.07",
      store: {
        storeId: 1,
        name: "종훈 떡볶이",
      },
      item: {
        name: "로제 떡볶이",
        imgUrl: "",
      },
      review: {
        star: 4,
      },
    },
  ];
  return (
    <div
      className={`overflow-auto h-full ${styles.headerMargin} ${styles.bottomMargin}`}
    >
      {items.map((item: any) => {
        return (
          <div className="flex flex-col p-4 border-b-8 border-[#C3CFD9] gap-4">
            <div className="font-semibold">{item.createdAt} 예약 완료</div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-[100px] h-[100px] flex justify-center items-center rounded-md bg-rose-400">
                  사진
                </div>
                <div className="flex flex-col">
                  <div>{item.store.name}</div>
                  <div className="bg-[#FF385C] text-white px-1">
                    {item.discount}% 할인받음
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/result");
                }}
              >
                <IoIosArrowDroprightCircle size={28} color={"#717171"} />
              </button>
            </div>
            {item.review.star ? (
              "⭐️".repeat(item.review.star)
            ) : (
              <button
                onClick={() => {
                  navigate(`/create-review/${item.store.storeId}`);
                }}
                className="w-full h-8 flex items-center bg-[#FF385C] text-white justify-center self-center"
              >
                리뷰 작성
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
