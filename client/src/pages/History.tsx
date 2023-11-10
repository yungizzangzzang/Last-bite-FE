import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchHistory } from "../api/storeAPI";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { styles } from "../utils/style";

function History() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || !Cookies.get("Authorization")) {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery(["history"], () => fetchHistory());

  return (
    <Layout>
      <Header />
      {isError && <div>정보를 가져오는동안 오류가 발생했습니다.</div>}
      {isLoading ? <Loading /> : <Body items={history} />}
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

function Body({ items }: { items: any }) {
  const navigate = useNavigate();
  return (
    <div
      className={`overflow-auto h-full ${styles.headerMargin} ${styles.bottomMargin}`}
    >
      {items?.length === 0 ? (
        <NotFound content="주문한 내역이 없어요!" />
      ) : (
        items?.map((item: any) => {
          return (
            <div
              key={item.itemId}
              className="flex flex-col p-4 border-b-8 border-[#C3CFD9] gap-2"
            >
              <div className="font-semibold cursor-default">
                {item?.createdAt.split("T")[0].split("-")[0]}년{" "}
                {item?.createdAt.split("T")[0].split("-")[1]}월{" "}
                {item?.createdAt.split("T")[0].split("-")[2]}일 예약 완료
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[100px] h-[100px] flex justify-center items-center rounded-md">
                    <img
                      className="w-[100px] h-[100px] rounded-md object-cover"
                      src="https://mys3image.s3.ap-northeast-2.amazonaws.com/ddeok_bok_gi.jpg"
                      alt="store_image"
                    />
                  </div>
                  <div className="flex flex-col gap-2 cursor-default">
                    <div className="font-semibold text-[20px]">
                      {item.storeName}
                    </div>
                    <div className="cursor-default border-[#FF385C] text-[#FF385C] text-[0.75rem] border-2  rounded-sm px-4 py-1 ">
                      {item?.discount}% 할인 받음
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/order/${item.orderId}`);
                  }}
                >
                  <IoIosArrowDroprightCircle size={28} color={"#717171"} />
                </button>
              </div>
              {item.star ? (
                "⭐️".repeat(item.star)
              ) : (
                <button
                  onClick={() => {
                    navigate(`/create-review/${item.orderId}/${item.storeId}`);
                  }}
                  className="w-full h-8 flex items-center bg-[#ff385c] font-semibold text-white rounded-sm justify-center self-center"
                >
                  리뷰 작성
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
