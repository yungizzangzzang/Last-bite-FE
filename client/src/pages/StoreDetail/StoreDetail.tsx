import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchStoreById } from "../../api/storeAPI";
import Footer from "../../components/Layout/Footer";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading";
import StoreDetailBody from "./StoreDetailBody";
import StoreDetailHeader from "./StoreDetailHeader";

function StoreDetail() {
  const { id } = useParams();

  const {
    data: store,
    isError,
    isLoading,
  } = useQuery(["store", id], () => fetchStoreById(id!));

  return (
    <Layout>
      {isError && <div>가게 정보를 가져오는동안 오류가 발생했습니다.</div>}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StoreDetailHeader storeId={id!} store={store} />
          <StoreDetailBody storeId={id!} store={store} />
        </>
      )}
      <Footer />
    </Layout>
  );
}

export default StoreDetail;
