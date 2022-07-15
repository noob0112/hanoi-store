export interface INewOrder {
  listItems: INewOrderItem[];
  voucherId: string;
}

interface INewOrderItem {
  itemId: string;
  quantity: number;
}
