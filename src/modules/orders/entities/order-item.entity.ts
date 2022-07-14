import { IOrderItemSummary } from './order-entity-summary';

export interface IOrderItem {
  item: IOrderItemSummary;
  quantity: number;
}
