import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { basketState } from "../states/basketState";
import { formatCreatedAt } from "../utils/dateFormat";
import { styles } from "../utils/style";

function OrderDetail() {
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

  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default OrderDetail;

function Header() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className={styles.header}
    >
      <AiOutlineArrowLeft />
      예약 상세
    </div>
  );
}

const fetchOneOrder = async (orderId: string) => {
  const response = await getAPI(`/orders/${orderId}`);
  return response.data.data;
};

function Body() {
  const { id } = useParams();
  const { data: order } = useQuery(["order", id], () => fetchOneOrder(id!));
  return (
    <div className={`h-full ${styles.headerMargin}`}>
      <BodyHeader
        discount={order?.discount}
        storeName={order?.storeName}
        createdAt={order?.createdAt}
        orderId={order?.orderId}
      />
      <BodyMain order={order} />
    </div>
  );
}

function BodyHeader({
  discount,
  storeName,
  createdAt,
  orderId,
}: {
  discount: number;
  storeName: string;
  createdAt: string;
  orderId: number;
}) {
  const formattedCreatedAt = formatCreatedAt(createdAt);

  return (
    <div className="flex flex-col p-4">
      <div className="font-semibold text-[#FF385C]">예약이 완료되었어요!</div>
      <div className="flex gap-10 font-bold ">
        <div className="text-[1.25rem]">{storeName}</div>
        <div className="bg-[#FF385C] text-white px-2 flex items-center">
          {discount}% 할인 받음
        </div>
      </div>
      <div>예약일시: {formattedCreatedAt}</div>
      <div>주문번호: {orderId}</div>
    </div>
  );
}

function BodyMain({ order }: { order: any }) {
  const items = useRecoilValue(basketState);
  return (
    <>
      <div className="border-y-8">
        {items.length !== 0
          ? items.map((item) => {
              return (
                <div className="flex flex-col p-4 border-b-2 border-[#C3CFD9]">
                  <div>
                    {item.name} {item.count}개
                  </div>
                  <div>{item.price * item.count}원</div>
                </div>
              );
            })
          : order?.items.map((item: any) => {
              return (
                <div className="flex flex-col p-4 border-b-2 border-[#C3CFD9]">
                  <div>
                    {item.name} {item.count}개
                  </div>
                  <div>{item.price * item.count}원</div>
                </div>
              );
            })}
      </div>
      <div className="p-4 font-bold text-[1.25rem]">
        결제 포인트 {order?.totalPrice}원
      </div>
    </>
  );
}
