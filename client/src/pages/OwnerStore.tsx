import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function OwnerStore() {
  return (
    <>
      <Layout>
        <Header />
        <Body />
        <OwnerFooter />
      </Layout>
    </>
  );
}

export default OwnerStore;

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
      매장 정보
    </div>
  );
}

function Body() {
  return (
    <div className={`flex flex-col ${styles.headerMargin} p-6 gap-2`}>
      <div className="font-semibold text-[1.25rem]">영업 정보</div>
      <div className="flex">
        <div className="w-[100px]">상호명</div>
        <div>종훈 떡볶이</div>
      </div>
      <div className="flex">
        <div className="w-[100px]">주소</div>
        <div>서울 특별시 테헤란로 77</div>
      </div>
      <div className="flex">
        <div className="w-[100px]">전화번호</div>
        <div>010-4499-3894</div>
      </div>
      <div className="flex">
        <div className="w-[100px]">업종</div>
        <div>음식점</div>
      </div>
      <div className="flex">
        <div className="w-[100px]">관리번호</div>
        <div>300000-235145-458411</div>
      </div>
    </div>
  );
}
