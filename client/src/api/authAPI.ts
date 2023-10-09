import { postAPI } from "../axios";

export const signUpAPI = async (data: any) => {
  return await postAPI("/signup", data);
};
