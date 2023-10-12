import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

const fetchHistory = async () => {
  const response = await getAPI("/orders");
  console.log(response.data);
  return response.data;
};

function History() {
  const { data: history } = useQuery(["history"], () => fetchHistory);
  console.log(history);
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
                <div className="flex flex-col gap-2">
                  <div>{item.store.name}</div>
                  <div className="border-[#FF385C] text-[0.75rem] border-4  rounded-full px-4 py-1 ">
                    {item.discount}% 할인받음
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate(`/order/1`);
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
                  navigate(
                    `/create-review/${item.orderId}/${item.store.storeId}`
                  );
                }}
                className="w-full h-8 flex items-center bg-[#FF385C] text-white rounded-full justify-center self-center"
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
