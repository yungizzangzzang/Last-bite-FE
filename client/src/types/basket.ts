export interface BasketItem {
  itemId: number;
  storeId: number;
  storeName: string;
  name: string;
  count: number;
  prevPrice: number;
  price: number;
  totalAvailableCount: number;
  imgUrl: string;
}
