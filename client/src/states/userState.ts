import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    email: null,
    isClient: null,
    name: null,
    nickname: null,
    storeId: null,
    userId: null,
  },
});
