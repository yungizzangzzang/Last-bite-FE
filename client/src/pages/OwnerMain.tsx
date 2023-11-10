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
          <Body storeId={id!} store={store?.store} items={store.items} />
        </>
      )}
      <div
        className={`min-w-[336px] w-[336px] fixed bottom-[52px] h-12 flex justify-center items-center`}
      >
        <button
          onClick={() => navigate("/register-item")}
          className="w-full h-10 text-white bg-[#FF385C]"
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
        className="h-6 text-white text-[0.75rem] rounded-sm bg-[#FF385C] px-2 ml-[2px]"
      >
        가게 리뷰
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="h-6 text-white text-[0.75rem] rounded-sm bg-[#788796] px-2 ml-[2px]"
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

function Body({
  items,
  storeId,
  store,
}: {
  items: any;
  storeId: string;
  store: any;
}) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (index: number) => {
    setSelectedItemIndex(index);
    setShowDropdown((prev) => !prev);
  };

  const editItem = (index: number) => {
    console.log(`Editing item at index ${index}`);
  };

  const deleteItem = (index: number) => {
    console.log(`Deleting item at index ${index}`);
  };

  return (
    <>
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
          className="h-6 text-white text-[0.75rem] rounded-sm bg-[#FF385C] px-2 ml-[2px]"
        >
          가게 리뷰
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-6 text-white text-[0.75rem] rounded-sm bg-[#788796] px-2 ml-[2px]"
        >
          알림 보내기
        </button>
      </div>
      <div
        className={`w-full h-full overflow-auto ${styles.headerMargin} mb-[92px] cursor-default z-10`}
      >
        {items.map((item: any, index: number) => (
          <div
            className={`w-full h-auto flex flex-col justify-center border-b-2 border-[#C3CFD9] p-6 z-10
             ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
          >
            <div className="flex items-center h-full">
              <div
                className={`h-full w-[80%] flex flex-col justify-center gap-1`}
              >
                <div className="text-[18px] font-semibold">{item.name}</div>
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
                    {item.prevPrice.toLocaleString("ko-KR")}
                  </div>
                  <div className="font-semibold text-red-500">
                    {item.price.toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>

              <div className="h-[100px] w-[120px] border-b-2  flex items-center justify-center rounded-lg">
                <img
                  src={item.imgUrl}
                  alt="item_img"
                  className="w-full h-full rounded-md object-fill"
                />
              </div>

              <div className="flex h-[120px] items-start justify-start relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="top-[4px] right-[4px] font-semibold text-[18px] pl-2"
                >
                  ⋮
                </button>

                {showDropdown && selectedItemIndex === index && (
                  <div className="absolute flex justify-center w-[100px] right-[8px] top-[32px] bg-white shadow-md rounded z-10">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer z-10"
                        onClick={() => editItem(index)}
                      >
                        수정하기
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => deleteItem(index)}
                      >
                        삭제하기
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        storeId={+storeId}
      />
    </>
  );
}
