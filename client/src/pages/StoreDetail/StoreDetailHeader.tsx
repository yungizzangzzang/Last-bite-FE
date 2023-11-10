import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../axios";
import { styles } from "../../utils/style";

function StoreDetailHeader({
  storeId,
  store,
}: {
  storeId: string;
  store: any;
}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(store.isLiked);

  const mutation = useMutation(() => postAPI(`/likes/${storeId}`, {}), {
    onSuccess: () => {
      setIsLiked(!isLiked);
    },
  });

  const toggleLike = () => {
    const user = localStorage.getItem("user");
    if (!user || !Cookies.get("Authorization")) {
      if (
        window.confirm("로그인이 필요한 페이지입니다. 로그인 하시겠습니까?")
      ) {
        return navigate("/login");
      } else {
        return;
      }
    }
    mutation.mutate();
  };

  useEffect(() => {
    setIsLiked(store.isLiked);
  }, [store.isLiked]);

  return (
    <div className={styles.header}>
      <div className="flex w-full items-center justify-between ">
        <div className="px-2 flex gap-2 items-center">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center"
          >
            <AiOutlineArrowLeft />
          </div>
          <div className="flex">
            <div className="flex items-center gap-1">
              <span className="cursor-default"> {store.store.name}</span>
              {isLiked ? (
                <GoHeartFill
                  color="#FF5352"
                  onClick={toggleLike}
                  className="cursor-pointer"
                />
              ) : (
                <GoHeart onClick={toggleLike} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/review/${storeId}`)}
          className="h-6 text-white text-[0.8rem] rounded-sm bg-[#FF385C] px-2 mx-2 items-center"
        >
          가게 리뷰
        </button>
      </div>
    </div>
  );
}

export default StoreDetailHeader;
