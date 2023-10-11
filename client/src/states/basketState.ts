import { atom } from "recoil";
import { BasketItem } from "./../types/basket";

export const basketState = atom<BasketItem[]>({
  key: "basketState",
  default: [],
});
