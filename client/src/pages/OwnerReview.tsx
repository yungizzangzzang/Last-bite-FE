import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReviewsByStoreId, fetchStoreById } from "../api/storeAPI";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import Loading from "../components/Loading";
import { styles } from "../utils/style";

function OwnerReview() {
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
        <Header storeId={id!} store={store.store} />
        {isLoading || reviewsIsLoading ? (
          <Loading />
        ) : (
          <Body reviews={reviews} />
        )}
        <OwnerFooter />
      </Layout>
    </>
  );
}

export default OwnerReview;

function Header({ storeId, store }: { storeId: string; store: any }) {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="px-2 flex gap-2 items-center"
      >
        <AiOutlineArrowLeft />
        <span> {store.name}</span>
      </div>
    </div>
  );
}

function Body({ reviews }: { reviews: any }) {
  return (
    <div
      className={`overflow-auto ${styles.headerMargin} ${styles.bottomMargin}`}
    >
      {reviews.map((review: any) => {
        return (
          <div className="flex flex-col gap-2 border-b-2 border-[#C3CFD9] p-6">
            <div className="font-semibold">{review.nickname}</div>
            <div>{"⭐️".repeat(review.star)}</div>
            <div>{review.content}</div>
          </div>
        );
      })}
    </div>
  );
}
