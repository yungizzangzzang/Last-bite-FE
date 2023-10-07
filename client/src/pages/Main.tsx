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
    <div className="flex bg-yellow-200">
      <div className="flex flex-1 h-16 justify-center items-center">음식점</div>
      <div className="flex flex-1 h-16 justify-center items-center">디저트</div>
      <div className="flex flex-1 h-16 justify-center items-center">편의점</div>
    </div>
  );
}

function BodyContent({ contentType }: { contentType: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-2/4 flex-col">
      <div className="h-[25%] flex justify-center items-center bg-sky-300">
        광고
      </div>
      <div
        className="cursor-pointer h-[10%] flex items-center"
        onClick={() => {
          contentType === "nearBy"
            ? navigate("/nearby")
            : navigate("/favorite");
        }}
      >
        {contentType === "nearBy" ? "내 주변 핫딜" : "단골 가게 핫딜"}
      </div>
      <div className="h-[65%] flex">
        <div className="h-full w-2/5 bg-emerald-500">
          <div className="h-5/6 flex items-center justify-center">사진</div>
          <div className="h-1/6 flex items-center bg-slate-300">가게이름</div>
        </div>
        <div className="h-full w-2/5 bg-emerald-500">
          <div className="h-5/6 flex items-center justify-center">사진</div>
          <div className="h-1/6 flex items-center bg-slate-300">가게이름</div>
        </div>
        <div className="h-full w-2/5 bg-emerald-500">
          <div className="h-5/6 flex items-center justify-center">사진</div>
          <div className="h-1/6 flex items-center bg-slate-300">가게이름</div>
        </div>
      </div>
    </div>
  );
}
