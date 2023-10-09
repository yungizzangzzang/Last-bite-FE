import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

function Mypage() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Mypage;

function Header() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft /> 마이 페이지
    </div>
  );
}

function Body() {
  return (
    <div className={`${styles.headerMargin}`}>
      <BodyHeader />
      <BodyMain />
    </div>
  );
}

function BodyHeader() {
  return (
    <div>
      <div className="p-4 flex flex-col gap-2 border-b-2 border-[#C3CFD9]">
        <span className="font-semibold text-[1.25rem]">윤기짱짱님</span>
        <div className="flex justify-between font-semibold text-[1.25rem]">
          <span>Point</span>
          <span>480,000</span>
        </div>
        <button className="flex justify-end text-[0.75rem]">충전하기</button>
      </div>
    </div>
  );
}

function BodyMain() {
  const favorites = [
    {
      name: "윤기네 치킨",
      isLiked: true,
    },
    {
      name: "종훈 떡볶이",
      isLiked: true,
    },
    {
      name: "승일 베이커리",
      isLiked: true,
    },
  ];
  return (
    <div className={`w-full overflow-auto ${styles.bottomMargin}`}>
      {favorites.map((favorite: any) => {
        return (
          <div className="w-full h-[80px] flex items-center p-4 justify-between border-b-2 border-[#C3CFD9]">
            <div>{favorite.name}</div>
            <div>
              {favorite.isLiked ? <GoHeartFill color="#FF5352" /> : <GoHeart />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
