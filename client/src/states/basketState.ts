import { atom } from "recoil";

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

export const basketState = atom<BasketItem[]>({
  key: "basketState",
  default: [],
});
