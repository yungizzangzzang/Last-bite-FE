import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllStores, fetchLikedStores } from "../api/storeAPI";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import { User } from "../types/user";
import { styles } from "../utils/style";

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
    <div className="flex justify-center items-center">
      <img
        src={process.env.PUBLIC_URL + "/asset/img/banner.png"}
        alt="banner"
        className="w-full"
      />
    </div>
  );
}

function Body() {
  return (
    <div className={`w-full h-full overflow-auto  ${styles.bottomMargin}`}>
      <BodyHeader />
      <BodyContent contentType="nearBy" />
      <BodyContent contentType="favorite" />
    </div>
  );
}

function BodyHeader() {
  return (
    <div className="flex mt-6">
      <button className="flex flex-1 h-16 justify-center items-center flex-col">
        <img
          src={process.env.PUBLIC_URL + "/asset/img/food.png"}
          alt="food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem]">음식점</span>
      </button>
      <button className="flex flex-1 h-16 justify-center items-center flex-col">
        <img
          src={process.env.PUBLIC_URL + "/asset/img/dessert.png"}
          alt="dessert"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem]">디저트</span>
      </button>
      <button className="flex flex-1 h-16 justify-center items-center flex-col">
        <img
          src={process.env.PUBLIC_URL + "/asset/img/convinient-store.png"}
          alt="convinient-store"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem]">편의점</span>
      </button>
    </div>
  );
}

function BodyContent({ contentType }: { contentType: string }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  }>({ longitude: null, latitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ longitude, latitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("위치 정보 제공 동의를 거절하였습니다.");
              toast.error(
                "위치 정보 제공 동의를 거절하였습니다. 제한된 기능만 사용 가능합니다."
              );
              break;
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  const isAuthenticated = Boolean(user && Cookies.get("Authorization"));
  let {
    data: likedStores,
    isError,
    isLoading,
  } = useQuery(["likedStores"], () => fetchLikedStores(), {
    enabled: isAuthenticated,
  });

  const {
    data: stores,
    isError: storesIsError,
    isLoading: storesIsLoading,
  } = useQuery(["stores", location.longitude, location.latitude], () =>
    location.longitude && location.latitude
      ? fetchAllStores(location.longitude, location.latitude)
      : Promise.reject("위치 정보가 설정되지 않았습니다.")
  );

  const handleContentClick = () => {
    if (contentType === "favorite" && !isAuthenticated) {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      } else {
        navigate("/");
      }
      return;
    }

    navigate(contentType === "nearBy" ? "/nearby" : "/favorite");
  };

  if (isLoading || storesIsLoading) {
    return <Loading />;
  }

  if (isError || storesIsError) {
    return <div>가게 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }

  if (!user || !Cookies.get("Authorization")) {
    likedStores = [];
  }
  console.log(stores);
  return (
    <div className="flex flex-col ">
      <div className="h-[56px] flex justify-center items-center bg-sky-300 w-[80%] rounded-md self-center my-6">
        광고
      </div>
      <div
        className="cursor-pointer h-[10%] flex items-center px-4 my-2 font-semibold"
        onClick={handleContentClick}
      >
        {contentType === "nearBy" ? "내 주변 핫딜" : "단골 가게 핫딜"}
      </div>
      {contentType === "nearBy" ? (
        <div className="flex flex-col gap-2 px-4 w-full">
          <div
            className="cursor-pointer bg-blue-400 flex justify-center w-2/4 rounded-full py-1 text-white"
            onClick={() => navigate("/store/1")}
          >
            <div className="flex items-center justify-center">
              {/* <img
                className="object-center rounded-lg"
                src={process.env.PUBLIC_URL + "/asset/img/1.jpg"}
                alt="item"
              /> */}
            </div>
            <div className="flex items-center"> 종훈 떡볶이</div>
          </div>
          <div
            className="cursor-pointer bg-blue-400 flex justify-center w-2/4 rounded-full py-1 text-white"
            onClick={() => navigate("/store/1")}
          >
            <div className="flex items-center justify-center">
              {/* <img
                className="object-center rounded-lg"
                src={process.env.PUBLIC_URL + "/asset/img/2.jpg"}
                alt="item"
              /> */}
            </div>
            <div className="flex items-center"> 희재 분식</div>
          </div>
          <div
            className="cursor-pointer bg-blue-400 flex justify-center w-2/4 rounded-full py-1 text-white"
            onClick={() => navigate("/store/1")}
          >
            <div className="flex items-center justify-center">
              {/* <img
                className="object-center rounded-lg"
                src={process.env.PUBLIC_URL + "/asset/img/3.jpg"}
                alt="item"
              /> */}
            </div>
            <div className="flex items-center">승일 피자</div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 px-4">
          {likedStores.map((store: any) => {
            return (
              <div
                className="cursor-pointer w-full justify-center gap-2"
                onClick={() => navigate(`/store/${store.storeId}`)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    {/* <img
                      className="object-center rounded-lg"
                      src={process.env.PUBLIC_URL + "/asset/img/1.jpg"}
                      alt="item"
                    /> */}
                  </div>
                  <div className="flex items-center">{store.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
