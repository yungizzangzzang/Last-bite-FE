import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Main() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Main;

function Header() {
  return (
    <div className="h-1/6 bg-blue-400 flex justify-center items-center">
      소개
    </div>
  );
}

function Body() {
  return (
    <div className="h-full">
      <BodyHeader />
      <BodyContent contentType="nearBy" />
      <BodyContent contentType="favorite" />
    </div>
  );
}

function BodyHeader() {
  return (
    <div className="flex border-y-2 border-black">
      <button className="flex flex-1 h-16 justify-center items-center">
        음식점
      </button>
      <button className="flex flex-1 h-16 justify-center items-center">
        디저트
      </button>
      <button className="flex flex-1 h-16 justify-center items-center">
        편의점
      </button>
    </div>
  );
}

function BodyContent({ contentType }: { contentType: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="h-[56px] flex justify-center items-center bg-sky-300 my-6">
        광고
      </div>
      <div
        className="cursor-pointer h-[10%] flex items-center px-2 mt-2"
        onClick={() => {
          contentType === "nearBy"
            ? navigate("/nearby")
            : navigate("/favorite");
        }}
      >
        {contentType === "nearBy" ? "내 주변 핫딜" : "단골 가게 핫딜"}
      </div>
      <div className="flex gap-2 px-2">
        <div
          className="cursor-pointer w-2/5 flex flex-col justify-center gap-2"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/1.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">종훈 떡볶이</div>
        </div>
        <div
          className="cursor-pointer w-2/5 flex flex-col justify-center gap-2"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/2.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">희재 분식</div>
        </div>
        <div
          className="cursor-pointer w-2/5 flex flex-col justify-center gap-2"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/3.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">승일 피자</div>
        </div>
      </div>
    </div>
  );
}
