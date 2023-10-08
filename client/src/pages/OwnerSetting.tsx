import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";

function OwnerSetting() {
  return (
    <Layout>
      <Header />
      <Body />
      <OwnerFooter />
    </Layout>
  );
}

export default OwnerSetting;

function Header() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="border-b-2 border-[#C3CFD9] gap-2 px-2 h-[5%] flex items-center"
    >
      <AiOutlineArrowLeft />
      설정
    </div>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[1.25rem] font-semibold p-4">내정보</div>
      <div className="flex justify-between px-4">
        <div className="font-semibold">닉네임</div>
        <div>윤기짱짱</div>
      </div>
      <div className="flex justify-between px-4">
        <div className="font-semibold">이메일</div>
        <div>yungizzang@naver.com</div>
      </div>
      <button className="flex justify-between border-y-2 border-[#C3CFD9] px-4 py-2">
        <div className="flex flex-col items-start">
          <div className="font-semibold">로그아웃</div>
          <div>계정을 로그아웃 합니다.</div>
        </div>
        <button className="h-full">로그아웃 버튼</button>
      </button>
    </div>
  );
}