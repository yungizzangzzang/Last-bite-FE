export interface BasketItem {
  itemId: number;
  storeId: number;
  name: string;
  count: number;
  prevPrice: number;
  price: number;
  totalAvailableCount: number;
  imgUrl: string;
}
