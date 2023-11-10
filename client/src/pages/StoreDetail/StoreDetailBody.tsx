import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { basketState } from "../../states/basketState";
import { BasketItem } from "../../types/basket";
import { styles } from "../../utils/style";

function StoreDetailBody({ storeId, store }: { storeId: string; store: any }) {
  const navigate = useNavigate();
  const items = store.items;
  const [basket, setBasket] = useRecoilState<BasketItem[]>(basketState);
  const [localBasket, setLocalBasket] = useState<BasketItem[]>(basket);
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>(
    () => {
      const initialCounts: { [key: number]: number } = {};
      if (items.message !== "진행 중인 핫딜 정보가 없습니다.") {
        items.forEach((item: any) => {
          const basketItem = basket.find(
            (bItem) => bItem.itemId === item.itemId
          );

          if (basketItem) {
            initialCounts[item.itemId] = basketItem.count;
          } else {
            initialCounts[item.itemId] = 0;
          }
        });
      }

      return initialCounts;
    }
  );
  useEffect(() => {
    setLocalBasket(basket);
  }, [basket]);

  function updateLocalBasketState(itemId: number, newCount: number) {
    const selectedItem = items.find((item: any) => item.itemId === itemId);

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
          storeName: store.store.name,
          itemId: selectedItem.itemId,
          name: selectedItem.name,
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
      if (localBasket.length > 0) {
        setBasket(localBasket);
        navigate("/basket");
      } else {
        toast.error("상품을 담아주세요!");
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
      let newBasket = [...basket];

      localBasket.forEach((localItem) => {
        const existingItemIndex = newBasket.findIndex(
          (basketItem) => basketItem.itemId === localItem.itemId
        );

        if (existingItemIndex !== -1) {
          newBasket[existingItemIndex] = {
            ...newBasket[existingItemIndex],
            count: newBasket[existingItemIndex].count + localItem.count,
          };
        } else {
          newBasket.push(localItem);
        }
      });

      newBasket = newBasket.filter((item) => item.count > 0);

      setBasket(newBasket);
      navigate("/basket");
    }
  };

  const incrementCount = (itemId: number) => {
    setItemCounts((prev) => {
      const updatedCounts = { ...prev, [itemId]: prev[itemId] + 1 };
      updateLocalBasketState(itemId, updatedCounts[itemId]);
      return updatedCounts;
    });
  };

  const decrementCount = (itemId: number) => {
    if (itemCounts[itemId] > 1) {
      setItemCounts((prev) => {
        const updatedCounts = { ...prev, [itemId]: prev[itemId] - 1 };
        updateLocalBasketState(itemId, updatedCounts[itemId]);
        return updatedCounts;
      });

      setBasket((prevBasket) => {
        const updatedBasket = [...prevBasket];
        const targetIndex = updatedBasket.findIndex(
          (item) => item.itemId === itemId
        );

        if (targetIndex !== -1) {
          if (itemCounts[itemId] - 1 === 0) {
            updatedBasket.splice(targetIndex, 1);
          } else {
            updatedBasket[targetIndex] = {
              ...updatedBasket[targetIndex],
              count: itemCounts[itemId] - 1,
            };
          }
          return updatedBasket;
        }
        return prevBasket;
      });
    }
  };

  return (
    <>
      <div
        className={`w-full h-full mb-[88px] ${styles.headerMargin} overflow-auto`}
      >
        {items.message !== "진행 중인 핫딜 정보가 없습니다." &&
          items?.map((item: any, index: number) => (
            <div
              key={item?.itemId}
              className={`w-full flex items-center border-b-2 border-[#C3CFD9] p-6
             ${index % 2 === 0 ? "bg-[#F7F9FA]" : "bg-white"}`}
            >
              <div
                className={`h-full w-[80%] flex flex-col justify-center gap-1`}
              >
                <div className="text-[18px] font-semibold">{item?.name}</div>
                <div className="text-[0.75rem]">{item?.content}</div>
                <div className="text-[0.75rem]">
                  잔여수량: {item?.count - (itemCounts[item?.itemId] || 0)}
                </div>

                <div className="flex gap-2 items-center">
                  <div
                    style={{
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                      color: "black",
                    }}
                  >
                    {item?.prevPrice.toLocaleString("ko-KR")}
                  </div>
                  <div className="font-semibold text-red-500">
                    {item?.price.toLocaleString("ko-KR")}
                  </div>
                  <div className="flex gap-2 py-1 px-2">
                    <button onClick={() => decrementCount(item?.itemId)}>
                      -
                    </button>
                    <div>{itemCounts[item?.itemId]}</div>
                    <button onClick={() => incrementCount(item?.itemId)}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-[100px] w-[100px] border-b-2  flex items-center justify-center rounded-lg">
                <img
                  src={item?.imgUrl}
                  alt="item_img"
                  className="w-full h-full rounded-md object-fill"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="min-w-[336px] w-[336px] fixed bottom-[52px] h-12 flex justify-center items-center">
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
