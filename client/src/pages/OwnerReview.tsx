import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function OwnerReview() {
  return (
    <>
      <Layout>
        <Header />
        <Body />
        <OwnerFooter />
      </Layout>
    </>
  );
}

export default OwnerReview;

function Header() {
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

function Body() {
  const reviews = [
    {
      nickname: "윤기짱짱",
      star: 5,
      content: "종훈 마크 인증! 떡볶이는 여기서만 먹어용~",
    },
    {
      nickname: "씅두잇",
      star: 5,
      content: "사장님 성함이 종훈이신가요? 좋은 이름이네요",
    },
    {
      nickname: "부엉희재",
      star: 5,
      content: "머리위에 부엉이가 날아갈 거 같은 맛이에요!",
    },
    {
      nickname: "윤기짱짱",
      star: 5,
      content: "종훈 마크 인증! 떡볶이는 여기서만 먹어용~",
    },
    {
      nickname: "씅두잇",
      star: 5,
      content: "사장님 성함이 종훈이신가요? 좋은 이름이네요",
    },
    {
      nickname: "부엉희재",
      star: 5,
      content: "머리위에 부엉이가 날아갈 거 같은 맛이에요!",
    },
    {
      nickname: "윤기짱짱",
      star: 5,
      content: "종훈 마크 인증! 떡볶이는 여기서만 먹어용~",
    },
    {
      nickname: "씅두잇",
      star: 5,
      content: "사장님 성함이 종훈이신가요? 좋은 이름이네요",
    },
    {
      nickname: "부엉희재",
      star: 5,
      content: "머리위에 부엉이가 날아갈 거 같은 맛이에요!",
    },
    {
      nickname: "윤기짱짱",
      star: 5,
      content: "종훈 마크 인증! 떡볶이는 여기서만 먹어용~",
    },
    {
      nickname: "씅두잇",
      star: 5,
      content: "사장님 성함이 종훈이신가요? 좋은 이름이네요",
    },
    {
      nickname: "부엉희재",
      star: 5,
      content: "머리위에 부엉이가 날아갈 거 같은 맛이에요!",
    },
  ];
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
