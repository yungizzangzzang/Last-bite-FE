import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

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
  return (
    <div className="border-b-2 border-[#C3CFD9] px-2 h-[5%] flex items-center">
      {"< 리뷰 작성"}
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col w-full justify-center items-center">
        <div>종훈 떡볶이</div>
        <div>22% 할인받음</div>
        <div>✩✩✩✩✩</div>
      </div>
      <textarea
        className="bg-slate-300 mt-10 p-2 mx-10 resize-none h-[300px]"
        maxLength={150}
      />
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="mt-10 w-full bg-[#FF385C] text-white font-bold h-12"
      >
        리뷰 등록
      </button>
    </div>
  );
}