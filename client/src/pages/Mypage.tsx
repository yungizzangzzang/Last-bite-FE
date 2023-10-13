import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineSetting } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/authAPI";
import { fetchLikedStores } from "../api/storeAPI";
import { postAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import ChargePointModal from "../components/Modals/ChargePointModal";
import useModal from "../hooks/useModal";
import { styles } from "../utils/style";

function Mypage() {
  const navigate = useNavigate();
  const { isOpen: isModalOpen, modalRef, openModal, closeModal } = useModal();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || !Cookies.get("Authorization")) {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <Layout>
      <Header />
      <Body openModal={openModal} />
      {isModalOpen && (
        <ChargePointModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalRef={modalRef}
        />
      )}
      <Footer />
    </Layout>
  );
}

export default Mypage;

function Header() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft className="cursor-pointer" /> 마이 페이지
    </div>
  );
}

interface BodyProps {
  openModal: () => void;
}

function Body({ openModal }: BodyProps) {
  return (
    <div className={`${styles.headerMargin}`}>
      <BodyHeader openModal={openModal} />
      <BodyMain />
    </div>
  );
}

interface BodyHeaderProps {
  openModal: () => void;
}

function BodyHeader({ openModal }: BodyHeaderProps) {
  const navigate = useNavigate();
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(["user"], () => fetchUser());

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>유저 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }
  return (
    <div>
      <div className="p-4 flex flex-col gap-2 border-b-2 border-[#C3CFD9]">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[1.25rem] cursor-default">
            {user.nickname}님
          </span>
          <AiOutlineSetting
            onClick={() => {
              navigate("/setting");
            }}
            size={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex justify-between font-semibold text-[1.25rem] cursor-default">
          <span>Point</span>
          <span>{user.point}</span>
        </div>
        <button onClick={openModal} className="flex justify-end text-[0.75rem]">
          충전하기
        </button>
      </div>
    </div>
  );
}

function BodyMain() {
  const navigate = useNavigate();
  const {
    data: likedStores,
    isError,
    isLoading,
    refetch,
  } = useQuery(["likedStores"], () => fetchLikedStores());

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>가게 정보를 가져오는동안 오류가 발생했습니다.</div>;
  }

  const toggleLike = async (storeId: number) => {
    await postAPI(`/likes/${storeId}`, {});
    refetch();
  };

  return (
    <div className={`w-full overflow-auto ${styles.bottomMargin}`}>
      {likedStores.map((favorite: any) => {
        return (
          <div
            onClick={() => navigate(`/store/1`)}
            key={favorite.latitude}
            className="w-full h-[60px] flex items-center p-4 justify-between border-b-2 border-[#C3CFD9]"
          >
            <div className="cursor-pointer">{favorite.name}</div>
            <button onClick={() => toggleLike(favorite.storeId)}>
              <GoHeartFill color="#FF5352" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
