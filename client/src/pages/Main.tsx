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
    <div className="flex h-[40%] flex-col">
      <div className="h-[25%] flex justify-center items-center bg-sky-300">
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
      <div className="h-[65%] flex gap-2 px-2">
        <div
          className="cursor-pointer h-full w-2/5 flex flex-col justify-center"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/종합스시.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">희재 분식</div>
        </div>
        <div
          className="cursor-pointer h-full w-2/5 flex flex-col justify-center"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/피자떡볶이.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">희재 분식</div>
        </div>
        <div
          className="cursor-pointer h-full w-2/5 flex flex-col justify-center"
          onClick={() => navigate("/store/1")}
        >
          <div className="flex items-center justify-center">
            <img
              className="object-center rounded-lg"
              src={process.env.PUBLIC_URL + "/asset/img/해물스파게티.jpg"}
              alt="item"
            />
          </div>
          <div className="h-1/6 flex items-center px-2">희재 분식</div>
        </div>
      </div>
    </div>
  );
}
