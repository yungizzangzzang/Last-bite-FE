import { postAPI } from "../axios";
import { getAPI } from "./../axios";

export const signUpAPI = async (data: any) => {
  return await postAPI("/signup", data);
};

export const fetchUser = async () => {
  const response = await getAPI("/user");
  return response.data.data;
};

export const chargePoint = async (point: number) => {
  return await postAPI("/point", { point });
};
