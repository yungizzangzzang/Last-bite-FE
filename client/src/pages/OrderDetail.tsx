import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { basketState } from "../states/basketState";
import { styles } from "../utils/style";

function OrderDetail() {
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
  const response = await getAPI(`/order/${orderId}`);
  console.log(response.data);
  return response.data;
};

function Body() {
  const { id } = useParams();
  const { data: order } = useQuery(["order", id], () => fetchOneOrder(id!));
  return (
    <div className={`h-full ${styles.headerMargin}`}>
      <BodyHeader
        discount={order.discount}
        storeName={order.storeName}
        createdAt={order.createdAt}
        orderId={order.orderId}
      />
      <BodyMain totalPrice={order.totalPrice} />
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
  return (
    <div className="flex flex-col p-4">
      <div className="font-semibold text-[#FF385C]">예약이 완료되었어요!</div>
      <div className="flex gap-10 font-bold ">
        <div className="text-[1.25rem]">{storeName}</div>
        <div className="bg-[#FF385C] text-white px-2 flex items-center">
          {discount}% 할인 받음
        </div>
      </div>
      <div>예약일시: {createdAt}</div>
      <div>주문번호: {orderId}</div>
    </div>
  );
}

function BodyMain({ totalPrice }: { totalPrice: number }) {
  const items = useRecoilValue(basketState);
  return (
    <>
      <div className="border-y-8">
        {items.map((item) => {
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
        결제 포인트 {totalPrice}원
      </div>
    </>
  );
}
