import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllStores, fetchLikedStores } from "../api/storeAPI";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
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
    <div className="grid grid-cols-4 grid-rows-3 mt-6 bg-white py-2 mx-2 rounded-md shadow-sm">
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
    </div>
  );
}

function BodyContent({ contentType }: { contentType: string }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLocationLoading, setLocationLoading] = useState(true);

  const [location, setLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  }>({ longitude: null, latitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ longitude, latitude });
          setLocationLoading(false);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("위치 정보 제공 동의를 거절하였습니다.");
              toast.error(
                "위치 정보 제공 동의를 거절하였습니다. 제한된 기능만 사용 가능합니다."
              );
              setLocationLoading(false);
              break;
          }
        }
      );
    } else {
      setLocationLoading(false);
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
    isError: likedStoresIsError,
    isLoading: likedStoresIsLoading,
  } = useQuery(["likedStores"], () => fetchLikedStores(), {
    enabled: isAuthenticated,
  });

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

  const storesInfo = useQuery(
    ["stores"],
    () => fetchAllStores(location.longitude, location.latitude),
    {
      enabled: !isLocationLoading,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  if (storesInfo.isLoading || likedStoresIsLoading || isLocationLoading) {
    return <Loading />;
  }

  if (likedStoresIsError || storesInfo.isError) {
    return <></>;
  }

  if (!user || !Cookies.get("Authorization")) {
    likedStores = [];
  }
  return (
    <div className="w-full flex flex-col px-2">
      <div
        className="cursor-pointer text-[14px] h-[10%] flex items-center px-2 mt-2 mb-[4px] font-semibold"
        onClick={handleContentClick}
      >
        {contentType === "nearBy" ? "내 주변 핫딜" : "단골 가게 핫딜"}
      </div>
      {contentType === "nearBy" ? (
        <div className="grid grid-cols-3 gap-2 w-full overflow-hidden bg-white p-2 rounded-md shadow-sm">
          {storesInfo?.data?.stores?.splice(0, 3).map((store: any) => {
            return (
              <div
                key={store.id}
                className="cursor-pointer flex flex-col justify-center rounded-full py-1"
                onClick={() => navigate(`/store/${store.id}`)}
              >
                <div className="flex w-full items-center justify-center">
                  <img
                    className="rounded-md"
                    src="https://mys3image.s3.ap-northeast-2.amazonaws.com/ddeok_bok_gi.jpg"
                    alt="store_image"
                  />
                </div>
                <div className="flex w-full items-center text-black text-[12px] font-semibold">
                  {store.name}
                </div>
              </div>
            );
          })}
        </div>
      ) : isAuthenticated ? (
        <div className="grid grid-cols-3 gap-2 w-full overflow-hidden bg-white p-2 rounded-md shadow-sm">
          {likedStores.map((store: any) => {
            return (
              <div
                key={store.id}
                className="cursor-pointer w-full justify-center gap-2"
                onClick={() => navigate(`/store/${store.id}`)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <img
                      className="rounded-md"
                      src="https://mys3image.s3.ap-northeast-2.amazonaws.com/ddeok_bok_gi.jpg"
                      alt="store_image"
                    />
                  </div>
                  <div className="flex items-center text-[12px] font-semibold">
                    {store.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="gap-2 w-full overflow-hidden bg-white p-2 rounded-md shadow-sm">
          <NotFound content="로그인 후 단골가게를 등록해주세요!" />
        </div>
      )}
    </div>
  );
}
