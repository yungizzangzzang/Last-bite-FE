import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { items } from "../../consts/items";
import { basketState } from "../../states/basketState";
import { BasketItem } from "../../types/basket";
import { styles } from "../../utils/style";

function StoreDetailBody({ storeId, store }: { storeId: string; store: any }) {
  const navigate = useNavigate();
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
          storeId: +storeId!,
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
      if (basket.length > 0 && basket[0].storeId === +storeId!) {
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

  return (
    <>
      <div
        className={`w-full h-full mb-[88px] ${styles.headerMargin} overflow-auto`}
      >
        {items.map((item: any, index: number) => (
          <div
            key={item.itemId}
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

export default StoreDetailBody;
