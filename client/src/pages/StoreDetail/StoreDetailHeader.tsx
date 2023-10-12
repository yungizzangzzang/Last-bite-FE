import { useState } from "react";
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
    mutation.mutate();
  };

  return (
    <div className={styles.header}>
      <div className="flex items-center">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="px-2 flex gap-2 items-center"
        >
          <AiOutlineArrowLeft />
        </div>
        <div className="flex flex-col text-[0.75rem]">
          <div className="flex items-center gap-1">
            <span> {store.name}</span>
            {isLiked ? (
              <GoHeartFill color="#FF5352" onClick={toggleLike} />
            ) : (
              <GoHeart onClick={toggleLike} />
            )}
          </div>
          <div className="text-[0.5rem]">{store.address}</div>
        </div>
        <button
          onClick={() => navigate(`/review/${storeId}`)}
          className="h-6 text-white text-[0.8rem] bg-[#FF385C] px-2 mx-2 items-center"
        >
          가게 리뷰
        </button>
      </div>
    </div>
  );
}

export default StoreDetailHeader;
