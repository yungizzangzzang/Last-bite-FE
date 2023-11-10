import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { styles } from "../utils/style";

function Nearby() {
  const [nearbyStores, setNearbyStores] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const categories = {
      "0": "",
      "1": "분식",
      "2": "양식/패스트푸드",
      "3": "일식/회",
      "4": "한식",
      "5": "치킨/술안주",
      "6": "중식",
      "7": "고기/구이",
      "8": "디저트",
      "9": "편의점",
      "10": "기타",
    };
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("latitude");

    if (longitude && latitude) {
      fetchStores({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        category: id ? categories[id as keyof typeof categories] : "", // Added type assertion here
      });
    } else {
      fetchStores({
        category: id ? categories[id as keyof typeof categories] : "",
      });
    }
  }, [id]);

  async function fetchStores(query: any) {
    const queryString = new URLSearchParams(query).toString();
    console.log(queryString);
    try {
      const response = await getAPI(`/stores?${queryString}`);
      console.log(response);
      setNearbyStores(response.data.data);
    } catch (error) {
      console.error("가게 정보를 가져오는 중 오류가 발생했습니다.", error);
    }
  }

  console.log(nearbyStores);
  return (
    <Layout>
      <Header />
      <Body nearbyStores={nearbyStores} />
      <Footer />
    </Layout>
  );
}

export default Nearby;

function Header() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft /> 내 주변 핫딜
    </div>
  );
}

function Body({ nearbyStores }: any) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`w-full h-full ${styles.headerMargin} ${styles.bottomMargin} overflow-auto`}
      >
        {nearbyStores?.stores?.map((store: any, index: number) => (
          <div
            key={store.id}
            onClick={() => navigate(`/store/${store.id}`)}
            className={`w-full h-[12%] p-2 flex items-center border-b-2 border-[#C3CFD9] gap-2 ${
              index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"
            }`}
          >
            <div className="w-[80px] h-full">
              <img
                className="w-[80px] h-[80px]"
                src={store.imgUrl}
                alt="store_image"
              />
            </div>
            <div className="w-[240px]">
              <div className="font-semibold">{store.name}</div>
              <div className="text-[0.75rem]">{store.address}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
