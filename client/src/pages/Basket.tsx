import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postAPI } from "../axios";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import NotFound from "../components/NotFound";
import { SocketContext } from "../contexts/SocketContext";
import { basketState } from "../states/basketState";
import { User } from "../types/user";
import { styles } from "../utils/style";

function Basket() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default Basket;

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
      장바구니
    </div>
  );
}

function Body() {
  type ItemCountsType = { [key: number]: number };
  const navigate = useNavigate();

  const items = useRecoilValue(basketState);
  const socket = useContext(SocketContext);
  const [itemCounts, setItemCounts] = useState<ItemCountsType>(() => {
    const initialCounts: ItemCountsType = {};
    items.forEach((item) => {
      initialCounts[item.itemId] = item.count;
    });
    return initialCounts;
  });

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  useEffect(() => {
    if (socket) {
      const handleOrderAlarm = (data: any) => {
        console.log(data);
      };

      socket.on("orderAlarmToOwner", handleOrderAlarm);
      return () => {
        socket.off("orderAlarmToOwner", handleOrderAlarm);
      };
    }
  }, [socket]);

  const incrementCount = (itemId: number) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const decrementCount = (itemId: number) => {
    if (itemCounts[itemId] > 1) {
      setItemCounts((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  };

  let totalPrice = 0;
  let totalPrevPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price * itemCounts[item.itemId];
    totalPrevPrice += item.prevPrice * itemCounts[item.itemId];
  });
  const discountPercentage = Math.round(
    (1 - totalPrice / totalPrevPrice) * 100
  );

  const sendOrderSocket = () => {
    if (!user || !Cookies.get("Authorization")) {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
      return;
    }

    if (socket) {
      const itemList: { [key: number]: number } = {};
      items.forEach((item) => {
        itemList[item.itemId] = itemCounts[item.itemId];
      });

      socket.emit("clientOrder", {
        userId: user?.userId,
        storeId: items[0].storeId,
        totalPrice: totalPrice,
        discount: discountPercentage,
        itemList: itemList,
      });

      navigate("/result");
    }
  };

  const sendOrder = async () => {
    const orderItems = items.map((item) => ({
      orderId: null,
      itemId: item.itemId,
      count: itemCounts[item.itemId],
    }));

    const payload = {
      storeId: items[0].storeId,
      totalPrice: totalPrice,
      discount: discountPercentage,
      items: orderItems,
    };

    await postAPI("/orders", payload);
  };

  return (
    <>
      <div
        className={`w-full h-full ${styles.headerMargin} mb-32 overflow-auto`}
      >
        {items.length === 0 ? (
          <NotFound content="장바구니에 담긴 상품이 없어요!" />
        ) : (
          items.map((item: any, index: number) => (
            <div
              key={item.itemId}
              className={`w-full h-[180px] flex flex-col p-2 border-b-2 border-[#C3CFD9] pt-4       
          ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}
        `}
            >
              <div className="px-2">{item.name}</div>
              <div className="flex h-full justify-around items-center">
                <div className="h-[100px] w-[100px] rounded-md flex justify-center items-center">
                  <img
                    src={item.imgUrl}
                    alt="item_img"
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="h-full w-[30%] flex flex-col justify-center">
                  <div
                    style={{
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                      color: "black",
                    }}
                  >
                    {item.prevPrice}원
                  </div>
                  <div>{item.price}원</div>
                </div>
                <div className="flex gap-2 py-1 px-2 items-center">
                  <button onClick={() => decrementCount(item.itemId)}>-</button>
                  <div>{itemCounts[item.itemId]}</div>
                  <button onClick={() => incrementCount(item.itemId)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length !== 0 && (
        <button
          onClick={() => {
            sendOrderSocket();
            sendOrder();
          }}
          className={`min-w-[336px] w-[336px] fixed ${styles.footerHeight} h-20 flex flex-col justify-center items-center`}
        >
          <button className="w-full h-10 text-white bg-[#FF385C]">
            총 {discountPercentage}% 할인받고 구매하기
          </button>
          <div className="flex justify-center items-center h-10 bg-white w-full">
            총액: {totalPrice}원
          </div>
        </button>
      )}
    </>
  );
}
