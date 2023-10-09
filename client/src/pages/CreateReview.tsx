import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { postAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

function CreateReview() {
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
  const { id } = useParams();
  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await postAPI(`/review/${id}`, { content, star });
      navigate(-1);
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <div className={`flex flex-col ${styles.headerMargin}`}>
      <div className="flex flex-col w-full justify-center items-center mt-10">
        <div>종훈 떡볶이</div>
        <div>22% 할인받음</div>
        <div className="cursor-pointer">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <span key={idx} onClick={() => setStar(idx + 1)}>
                {idx < star ? "⭐️" : "✩"}
              </span>
            ))}
        </div>
      </div>
      <textarea
        className="bg-slate-300 mt-10 p-2 mx-10 resize-none h-[300px]"
        maxLength={150}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-10 w-full bg-[#FF385C] text-white font-bold h-12"
      >
        리뷰 등록
      </button>
    </div>
  );
}
