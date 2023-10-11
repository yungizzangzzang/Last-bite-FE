import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import { basketState } from "../states/basketState";
import { styles } from "../utils/style";

function StoreDetail() {
  return (
    <Layout>
      <Header />
      <Body />
      <Footer />
    </Layout>
  );
}

export default StoreDetail;

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
        <GoHeartFill color="#FF5352" />
      </div>
      <button
        onClick={() => navigate("/review/1")}
        className="h-6 text-white text-[0.8rem] bg-[#FF385C] px-2 mx-2"
      >
        가게 리뷰
      </button>
    </div>
  );
}
const items = [
  {
    itemId: 1,
    title: "종훈 떡볶이",
    content: "매콤 달달 떡볶이, 1,000원 할인!",
    count: 12,
    prevPrice: 4000,
    price: 3000,
    imgUrl:
      "https://i.namu.wiki/i/zwU_AZyax9F-F1tnLYQbrVo50NotFi7AIJeWje1McwYErmTXlSxE16M01VVBtJph8eMW6h7zQWpo89hfELfcZeBuA1OU4yNHfsIoxc0IoSCBGSdJ95HNrpp5cdJSsiQjIwub1XYkcxBO3QovLdrcIw.webp",
  },
  {
    itemId: 2,
    title: "로제 떡볶이",
    content: "요즘 대세 떡볶이",
    count: 3,
    prevPrice: 6000,
    price: 4000,
    imgUrl:
      "https://static.wtable.co.kr/image/production/service/product/9900/99f85736-f3a5-4043-bc7c-ba971b1aa9d8.jpg?size=500x500",
  },
  {
    itemId: 3,
    title: "새우 튀김",
    content: "파사삭 새우 오늘만 할인! (6ea)",
    count: 4,
    prevPrice: 6000,
    price: 5000,
    imgUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAxOTExMTBfMTU2/MDAxNTczMzczNjc0OTcw.A0oC6fKkxVE42E68RwKtrZggpOBUYlyGdoaRnz6ZWmYg.VTyVGLLlyMY-rkGmpvQuRcHFS1tZrqy-kNW1x1TlxVIg.JPEG.cshee32/stkm9433_1110-72.jpg?type=w800",
  },
  {
    itemId: 4,
    title: "짜장 떡볶이",
    content: "짜장, 1,500원 할인!",
    count: 8,
    prevPrice: 4000,
    price: 2500,
    imgUrl:
      "https://recipe1.ezmember.co.kr/cache/recipe/2019/03/06/4f909b6e7814eb168ff504c6fa296a6a1.jpg",
  },
  {
    itemId: 5,
    title: "스테이크",
    content: "맛있는 스테이크",
    count: 3,
    prevPrice: 60000,
    price: 45000,
    imgUrl:
      "https://i.namu.wiki/i/0U_ZI9Qe2V-aPjsuboQMCbZEQMSJtd5qvoIwyjMpN3tv3Va-ybtI2QyWa4s5Qre5CUXX1bPKJ520dWlaNY5pcPw3PjjkB5sIqjcxXwZ44ZiurE8u7WLo3-Yg9913E1iduz_am4u-YO8yV4szpq5V8w.webp",
  },
  {
    itemId: 6,
    title: "메기탕",
    content: "얼큰한 메기탕 오늘만 할인",
    count: 4,
    prevPrice: 5500,
    price: 500,
    imgUrl:
      "https://recipe1.ezmember.co.kr/cache/recipe/2015/06/03/4a0613c3c9df8d2aaa2de86fa44e261a1.jpg",
  },
  {
    itemId: 7,
    title: "햅쌀와플",
    content: "둘이 먹다 하나 죽어도 모르는 햅쌀와플",
    count: 12,
    prevPrice: 4000,
    price: 2000,
    imgUrl:
      "https://cdn.imweb.me/upload/S202006267a3fccbe0e5dc/228d8185a396b.png",
  },
  {
    itemId: 8,
    title: "존맛탱 코코넛 스무디",
    content: "잘팔려서 조금만 할인해요",
    count: 3,
    prevPrice: 7000,
    price: 6000,
    imgUrl:
      "https://dnvefa72aowie.cloudfront.net/business-profile/bizPlatform/profile/26148714/1679213040777/ZWIwYzM3MTZlZTMxYTAxMmM0MDAwN2IxY2VjMTdlY2Q5MTgxYjZjOGI0MjViMTZhOTI0YzE4NWM4Y2JiYzVlYi5qcGc=.jpeg?q=95&s=1440x1440&t=inside",
  },
  {
    itemId: 9,
    title: "숯불치킨",
    content: "떡처럼 쫄깃쫄깃한 우동사리는 서비스",
    count: 4,
    prevPrice: 13000,
    price: 9000,
    imgUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA0MDJfNjQg/MDAxNTg1NzU4MTIzODQy.NZuks7m0YoeXhlo4YBlWlJYtV5OERA7cD5QDk97b148g.ozBeE6ZYScDlpZzwiTtq4XgHJRbR8j3a-_T8EXagZyAg.JPEG.yjw03110311/output_115213388.jpg?type=w800",
  },
];

type BasketItem = {
  itemId: number;
  storeId: number;
  name: string;
  count: number;
  prevPrice: number;
  price: number;
  totalAvailableCount: number;
  imgUrl: string;
};

function Body() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [localBasket, setLocalBasket] = useState<BasketItem[]>([]);
  const [basket, setBasket] = useRecoilState<BasketItem[]>(basketState);
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>(
    () => {
      const initialCounts: { [key: number]: number } = {};
      items.forEach((item) => {
        const basketItem = basket.find((bItem) => bItem.itemId === item.itemId);

        if (basketItem) {
          initialCounts[item.itemId] = basketItem.count;
        } else {
          initialCounts[item.itemId] = 0;
        }
      });
      return initialCounts;
    }
  );

  function updateLocalBasketState(itemId: number, newCount: number) {
    const selectedItem = items.find((item) => item.itemId === itemId);

    if (selectedItem) {
      const existingItemIndex = localBasket.findIndex(
        (item: BasketItem) => item.itemId === itemId
      );

      if (existingItemIndex !== -1) {
        const updatedBasket = [...localBasket];
        updatedBasket[existingItemIndex] = {
          ...updatedBasket[existingItemIndex],
          count: newCount,
        };
        setLocalBasket(updatedBasket);
      } else {
        const newItem: BasketItem = {
          storeId: +id!,
          itemId: selectedItem.itemId,
          name: selectedItem.title,
          count: newCount,
          prevPrice: selectedItem.prevPrice,
          price: selectedItem.price,
          totalAvailableCount: selectedItem.count,
          imgUrl: selectedItem.imgUrl,
        };
        setLocalBasket((prevBasket) => [...prevBasket, newItem]);
      }
    }
  }

  const handleAddToBasket = () => {
    if (!localBasket.length) {
      if (basket.length > 0 && basket[0].storeId === +id!) {
        navigate("/basket");
      } else {
        alert("상품을 담아주세요!");
      }
      return;
    }

    if (basket.length > 0 && basket[0].storeId !== localBasket[0].storeId) {
      const confirmation = window.confirm(
        "이전에 담은 상품이 초기화됩니다. 새로 담을까요?"
      );
      if (confirmation) {
        setBasket(localBasket);
        navigate("/basket");
      }
    } else {
      const newBasket = [...basket];

      localBasket.forEach((localItem) => {
        const existingItemIndex = newBasket.findIndex(
          (basketItem) => basketItem.itemId === localItem.itemId
        );

        if (existingItemIndex !== -1) {
          newBasket[existingItemIndex].count += localItem.count;
        } else {
          newBasket.push(localItem);
        }
      });

      setBasket(newBasket);
      navigate("/basket");
    }
  };

  const incrementCount = (itemId: number) => {
    const selectedItem = items.find((item) => item.itemId === itemId);

    if (selectedItem && itemCounts[itemId] < selectedItem.count) {
      setItemCounts((prev) => {
        const updatedCounts = { ...prev, [itemId]: prev[itemId] + 1 };
        updateLocalBasketState(itemId, updatedCounts[itemId]);
        return updatedCounts;
      });
    }
  };

  const decrementCount = (itemId: number) => {
    if (itemCounts[itemId] > 0) {
      setItemCounts((prev) => {
        const updatedCounts = { ...prev, [itemId]: prev[itemId] - 1 };
        updateLocalBasketState(itemId, updatedCounts[itemId]);
        return updatedCounts;
      });
    }
  };

  console.log(basket);
  return (
    <>
      <div
        className={`w-full h-full mb-[88px] ${styles.headerMargin} overflow-auto`}
      >
        {items.map((item: any, index: number) => (
          <div
            className={`w-full flex items-center border-b-2 border-[#C3CFD9] p-2
             ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
          >
            <div
              className={`h-full w-[80%] flex flex-col justify-center gap-1`}
            >
              <div className="text-[1.25rem]">{item.title}</div>
              <div className="text-[0.75rem]">{item.content}</div>
              <div className="text-[0.75rem]">
                잔여수량: {item.count - (itemCounts[item.itemId] || 0)}
              </div>

              <div className="flex gap-2 items-center">
                <div
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "red",
                    color: "black",
                  }}
                >
                  {item.prevPrice}
                </div>
                <div className="font-semibold text-red-500">{item.price}</div>
                <div className="flex gap-2 py-1 px-2">
                  <button onClick={() => decrementCount(item.itemId)}>-</button>
                  <div>{itemCounts[item.itemId]}</div>
                  <button onClick={() => incrementCount(item.itemId)}>+</button>
                </div>
              </div>
            </div>

            <div className="h-[100px] w-[100px] border-b-2  flex items-center justify-center rounded-lg">
              <img
                src={item.imgUrl}
                alt="item_img"
                className="w-full h-full rounded-md object-fill"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="min-w-[336px] w-[336px] fixed bottom-[50px] h-12 flex justify-center items-center">
        <button
          onClick={handleAddToBasket}
          className="w-full h-10 text-white bg-[#FF385C]"
        >
          장바구니 담기
        </button>
      </div>
    </>
  );
}
