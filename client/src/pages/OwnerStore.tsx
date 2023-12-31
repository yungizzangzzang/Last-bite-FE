import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStoreById } from "../api/storeAPI";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function OwnerStore() {
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
  const { id } = useParams();
  const { data: store, isLoading } = useQuery(["store", id], () =>
    fetchStoreById(id!)
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={`flex flex-col ${styles.headerMargin} p-6 gap-2`}>
      <div className="font-semibold text-[1.25rem]">영업 정보</div>
      <div className="flex gap-2">
        <div className="w-[100px]">상호명</div>
        <div className="w-full">{store.store.name}</div>
      </div>
      <div className="flex gap-2">
        <div className="w-[100px]">주소</div>
        <div className="w-full">{store.store.address}</div>
      </div>
      <div className="flex gap-2">
        <div className="w-[100px]">전화번호</div>
        <div className="w-full">{store.store.storePhoneNumber}</div>
      </div>
      <div className="flex gap-2">
        <div className="w-[100px]">업종</div>
        <div className="w-full">{store.store.category}</div>
      </div>
      {/* <div className="flex gap-2">
        <div className="w-[100px]">관리번호</div>
        <div className="w-full">{store.store.managementNumber}</div>
      </div> */}
    </div>
  );
}
