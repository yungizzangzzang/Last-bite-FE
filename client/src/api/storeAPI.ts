import { getAPI } from "./../axios";

export const fetchStoreById = async (storeId: string) => {
  const response = await getAPI(`/stores/${storeId}`);
  return response.data.data;
};
