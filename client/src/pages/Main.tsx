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
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 grid-rows-3 mt-6 bg-white py-2 mx-2 rounded-md shadow-sm">
      <button
        onClick={() => navigate("/nearby/11")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/dessert.png"}
          alt="dessert"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">전체</span>
      </button>
      <button
        onClick={() => navigate("/nearby/0")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/snack-bar.png"}
          alt="snack-bar"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">분식</span>
      </button>
      <button
        onClick={() => navigate("/nearby/2")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/fast-food.png"}
          alt="fast-food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">양식/패스트푸드</span>
      </button>
      <button
        onClick={() => navigate("/nearby/3")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/japanese-food.png"}
          alt="japanese-food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">일식/회</span>
      </button>
      <button
        onClick={() => navigate("/nearby/4")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/korean-food.png"}
          alt="korean-food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">한식</span>
      </button>
      <button
        onClick={() => navigate("/nearby/5")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/chicken.png"}
          alt="chicken"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">치킨/술안주</span>
      </button>
      <button
        onClick={() => navigate("/nearby/6")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/chinese-food.png"}
          alt="chinese-food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">중식</span>
      </button>
      <button
        onClick={() => navigate("/nearby/7")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/food.png"}
          alt="food"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">고기/구이</span>
      </button>
      <button
        onClick={() => navigate("/nearby/8")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/dessert.png"}
          alt="dessert"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">디저트</span>
      </button>
      <button
        onClick={() => navigate("/nearby/9")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/convinient-store.png"}
          alt="convinient-store"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">편의점</span>
      </button>
      <button
        onClick={() => navigate("/nearby/10")}
        className="flex flex-1 h-16 justify-center items-center flex-col"
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/etc.png"}
          alt="etc"
          className="w-12 h-12"
        />
        <span className="text-[0.75rem] font-semibold">기타</span>
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
          localStorage.setItem(
            "location",
            JSON.stringify({ longitude, latitude })
          );
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
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 600000,
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

    navigate(contentType === "nearBy" ? "/nearby/0" : "/favorite");
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
      {contentType === "nearBy" ? (
        <div className="bg-white rounded-md mt-4">
          <div
            className="cursor-pointer text-[14px] h-[10%] flex items-center px-2 mt-2 mb-[4px] font-semibold"
            onClick={handleContentClick}
          >
            내 주변 핫딜
          </div>
          <div className="grid grid-cols-3 gap-2 w-full overflow-hidden p-2 ">
            {storesInfo?.data?.stores?.slice(0, 3).map((store: any) => {
              return (
                <div
                  key={store.id}
                  className="cursor-pointer flex flex-col justify-center rounded-full py-1"
                  onClick={() => navigate(`/store/${store.id}`)}
                >
                  <div className="flex w-full items-center justify-center">
                    <img
                      className="rounded-md h-[90px]"
                      src={
                        store.imgUrl ??
                        "https://mys3image.s3.ap-northeast-2.amazonaws.com/whale.png"
                      }
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
        </div>
      ) : isAuthenticated ? (
        <div className="bg-white rounded-md shadow-sm mt-4">
          <div
            className="cursor-pointer text-[14px] h-[10%] flex items-center px-2 mt-2 mb-[4px] font-semibold"
            onClick={handleContentClick}
          >
            단골가게 핫딜
          </div>

          <div className="grid grid-cols-3 gap-2 w-full overflow-hidden p-2">
            {likedStores.map((store: any) => {
              return (
                <div
                  key={store.storeId}
                  className="cursor-pointer w-full justify-center gap-2"
                  onClick={() => navigate(`/store/${store.storeId}`)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-full">
                      <img
                        className="rounded-md object-cover h-[90px]"
                        src={
                          store.imgUrl ??
                          "https://mys3image.s3.ap-northeast-2.amazonaws.com/whale.png"
                        }
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
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm mt-4">
          <div
            className="cursor-pointer text-[14px] h-[10%] flex items-center px-2 mt-2 mb-[4px] font-semibold"
            onClick={handleContentClick}
          >
            단골가게 핫딜
          </div>
          <div className="gap-2 w-full overflow-hidden bg-white p-2 rounded-md shadow-sm">
            <NotFound content="로그인 후 단골가게를 등록해주세요!" />
          </div>
        </div>
      )}
    </div>
  );
}
