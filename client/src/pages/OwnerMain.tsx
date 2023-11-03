import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStoreById } from "../api/storeAPI";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import Loading from "../components/Loading";
import NotificationModal from "../components/Modals/NotificationModal";
import { styles } from "../utils/style";

function OwnerMain() {
  const { id } = useParams();
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
          <Header storeId={id!} store={store?.store} />
          <Body items={store.items} />
        </>
      )}
      <div
        className={`min-w-[336px] w-[336px] fixed bottom-[52px] h-12 flex justify-center items-center`}
      >
        <button
          onClick={() => navigate("/register-item")}
          className="w-full h-10 text-white bg-[#FF385C] z-40"
        >
          핫딜 등록하기
        </button>
      </div>
      <OwnerFooter />
    </Layout>
  );
}

export default OwnerMain;

function Header({ storeId, store }: { storeId: string; store: any }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`${styles.header}`}>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="flex gap-2 items-center justify-between"
      >
        <AiOutlineArrowLeft className="cursor-pointer" />
        <span className=" w-[136px] cursor-default"> {store.name}</span>
      </div>
      <button
        onClick={() => navigate(`/owner/review/${storeId}`)}
        className="h-6 text-white text-[0.75rem] rounded-full bg-[#FF385C] px-2 ml-[2px]"
      >
        가게 리뷰
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-6 text-white text-[0.75rem] rounded-full bg-[#788796] px-2 ml-[2px]"
      >
        알림 보내기
      </button>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        storeId={+storeId}
      />
    </div>
  );
}

function Body({ items }: { items: any }) {
  return (
    <>
      <div
        className={`w-full h-full overflow-auto ${styles.headerMargin} mb-[92px] cursor-default`}
      >
        {items.map((item: any, index: number) => (
          <div
            className={`w-full flex flex-col justify-center border-b-2 border-[#C3CFD9] px-4 py-3
             ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
          >
            <div className="flex items-center">
              <div
                className={`h-full w-[80%] flex flex-col justify-center gap-1`}
              >
                <div className="text-[1.25rem] font-semibold">{item.name}</div>
                <div className="text-[0.75rem]">{item.content}</div>
                <div className="text-[0.75rem]">잔여수량: {item.count}</div>

                <div className="flex gap-2 items-center">
                  <div
                    style={{
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                      color: "black",
                    }}
                  >
                    {item.prevPrice}
                  </div>
                  <div className="font-semibold text-red-500">{item.price}</div>
                </div>
              </div>

              <div className="h-[100px] w-[100px] border-b-2  flex items-center justify-center rounded-lg">
                <img
                  src={item.imgUrl}
                  alt="item_img"
                  className="w-full h-full rounded-md object-fill"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
