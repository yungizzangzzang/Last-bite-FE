import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReviewsByStoreId, fetchStoreById } from "../api/storeAPI";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function OwnerReview() {
  const { id } = useParams();
  const { data: store, isLoading } = useQuery(["store", id], () =>
    fetchStoreById(id!)
  );

  const { data: reviews, isLoading: reviewsIsLoading } = useQuery(
    ["reviews", id],
    () => fetchReviewsByStoreId(id!)
  );

  if (isLoading || reviewsIsLoading) return <div>로딩중...</div>;

  return (
    <>
      <Layout>
        <Header storeId={id!} store={store.store} />
        <Body reviews={reviews} />

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
        <span> 종훈 떡볶이</span>
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
