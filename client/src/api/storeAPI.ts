import { getAPI } from "./../axios";

export const fetchStoreById = async (storeId: string) => {
  const response = await getAPI(`/stores/${storeId}`);
  return response.data.data;
};

export const fetchReviewsByStoreId = async (storeId: string) => {
  const response = await getAPI(`/reviews/${storeId}`);
  return response.data.data;
};
