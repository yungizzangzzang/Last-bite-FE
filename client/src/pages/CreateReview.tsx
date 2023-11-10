import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOrderById } from "../api/storeAPI";
import { postAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function CreateReview() {
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

export default CreateReview;

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
      리뷰 작성
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const { orderId, storeId } = useParams();
  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    try {
      await postAPI(`/reviews/${orderId}/stores/${storeId}`, { content, star });
      toast.success("리뷰 작성 완료!");
      navigate(-1);
    } catch (error) {
      toast.error("리뷰를 저장하는 도중 오류가 발생했습니다.");
      console.error("Error submitting the review:", error);
    }
  };

  const {
    data: order,
    isError,
    isLoading,
  } = useQuery(["order", orderId], () => fetchOrderById(orderId!));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>가게 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }

  return (
    <div className={`flex flex-col ${styles.headerMargin}`}>
      <div className="flex flex-col w-full justify-center items-center mt-10">
        <div className="text-[28px] font-semibold">{order.storeName}</div>
        <div className="text-[#FF385C] font-semibold">
          {order.discount}% 할인받음
        </div>
        <div className="cursor-pointer">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <span
                key={idx}
                className="text-[32px]"
                onClick={() => setStar(idx + 1)}
              >
                {idx < star ? "⭐️" : "✩ "}
              </span>
            ))}
        </div>
      </div>
      <textarea
        placeholder="리뷰를 작성해주세요!"
        className="bg-[#ced8e0] outline-none rounded-md mt-10 p-2 mx-10 resize-none h-[240px]"
        maxLength={150}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-10 w-[80%] flex self-center justify-center items-center rounded-sm bg-[#FF385C] text-white font-bold h-8"
      >
        리뷰 등록하기
      </button>
    </div>
  );
}
