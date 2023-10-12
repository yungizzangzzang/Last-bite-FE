import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStoreById } from "../api/storeAPI";
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
  const { id } = useParams();
  const { data: store, isLoading } = useQuery(["store", id], () =>
    fetchStoreById(id!)
  );
  if (isLoading) {
    return <div>로딩중...</div>;
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
