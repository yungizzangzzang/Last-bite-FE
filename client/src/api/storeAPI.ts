import { getAPI } from "./../axios";

export const fetchStoreById = async (storeId: string) => {
  const response = await getAPI(`/stores/${storeId}`);
  return response.data.data;
};

export const fetchAllStores = async (
  longitude: number | null,
  latitude: number | null
) => {
  const response = await getAPI(
    `/stores/?longitude=${longitude}&latitude=${latitude}`
  );
  return response.data.data;
};

export const fetchReviewsByStoreId = async (storeId: string) => {
  const response = await getAPI(`/reviews/${storeId}`);
  return response.data.data;
};

export const fetchOrderById = async (orderId: string) => {
  const response = await getAPI(`/orders/${orderId}`);
  return response.data.data;
};

export const fetchHistory = async () => {
  const response = await getAPI("/orders");
  return response.data.data;
};

export const fetchLikedStores = async () => {
  const response = await getAPI("/likes");
  return response.data.data.stores;
};
