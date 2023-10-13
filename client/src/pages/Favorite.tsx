import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchLikedStores } from "../api/storeAPI";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function Favorite() {
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
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Favorite;

function Header() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft /> 단골 가게 핫딜
    </div>
  );
}

function Body() {
  const navigate = useNavigate();
  const {
    data: likedStores,
    isError,
    isLoading,
  } = useQuery(["likedStores"], () => fetchLikedStores());

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>가게 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }
  return (
    <>
      <div
        className={`w-full h-full ${styles.headerMargin} ${styles.bottomMargin} overflow-auto`}
      >
        {likedStores.map((item: any, index: number) => (
          <div
            key={item.storeId}
            onClick={() => navigate("/store/1")}
            className={`w-full h-[12%] p-2 flex items-center border-b-2 border-[#C3CFD9] gap-2 ${
              index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"
            }`}
          >
            <div className="w-[25%] h-full rounded-md bg-blue-300">
              {item.imgurl}
            </div>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-[0.75rem]">{item.address}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
