import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReviewsByStoreId, fetchStoreById } from "../api/storeAPI";
import { postAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function Review() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: store, isLoading } = useQuery(["store", id], () =>
    fetchStoreById(id!)
  );

  const { data: reviews, isLoading: reviewsIsLoading } = useQuery(
    ["reviews", id],
    () => fetchReviewsByStoreId(id!)
  );

  return (
    <>
      <Layout>
        <Header storeId={id!} store={store} />
        {isLoading || reviewsIsLoading ? (
          <Loading />
        ) : (
          <>
            <Body reviews={reviews} />
            <div className="min-w-[336px] w-[336px] fixed bottom-[50px] h-12 flex justify-center items-center">
              <button
                onClick={() => navigate(-1)}
                className="w-full h-10 text-white bg-[#FF385C]"
              >
                주문하러 가기
              </button>
            </div>
          </>
        )}
        <Footer />
      </Layout>
    </>
  );
}

export default Review;

function Header({ storeId, store }: { storeId: string; store: any }) {
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
      <div className="px-2 flex gap-2 items-center">
        <AiOutlineArrowLeft onClick={() => navigate(-1)} />
        <span> {store.store.name}</span>
        {isLiked ? (
          <GoHeartFill color="#FF5352" onClick={toggleLike} />
        ) : (
          <GoHeart onClick={toggleLike} />
        )}
      </div>
    </div>
  );
}

function Body({ reviews }: { reviews: any }) {
  return (
    <div className={`overflow-auto ${styles.headerMargin} mb-24`}>
      {reviews.map((review: any) => {
        return (
          <div className="flex flex-col gap-2 border-b-2 border-[#C3CFD9] p-2">
            <div className="font-semibold">{review.nickname}</div>
            <div>{"⭐️".repeat(review.star)}</div>
            <div>{review.content}</div>
          </div>
        );
      })}
    </div>
  );
}
