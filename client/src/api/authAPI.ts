import { postAPI } from "../axios";

export const signUpAPI = async (data: any) => {
  return await postAPI("/auth/signup", data);
};
