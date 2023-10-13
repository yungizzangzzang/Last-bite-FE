import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { useQuery } from "react-query";
import { fetchUser } from "../api/authAPI";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function Setting() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Setting;

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
      설정
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(["user"], () => fetchUser());

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>유저 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }
  return (
    <div
      className={`flex flex-col gap-2 ${styles.headerMargin} cursor-default`}
    >
      <div className="text-[1.25rem] font-semibold p-4">내정보</div>
      <div className="flex justify-between px-4">
        <div className="font-semibold">닉네임</div>
        <div>{user.nickname}</div>
      </div>
      <div className="flex justify-between px-4">
        <div className="font-semibold">이메일</div>
        <div>{user.email}</div>
      </div>
      <div
        onClick={() => {
          localStorage.clear();
          Cookies.remove("Authorization");
          navigate("/login");
        }}
        className="flex cursor-pointer justify-between border-y-2 border-[#C3CFD9] px-4 py-2"
      >
        <div className="flex flex-col items-start">
          <div className="font-semibold">로그아웃</div>
          <div className="text-[0.75rem]">계정을 로그아웃 합니다.</div>
        </div>
        <button className="h-full">
          <FiLogOut size={24} />
        </button>
      </div>
    </div>
  );
}
