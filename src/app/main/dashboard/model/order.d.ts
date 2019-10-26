import {Product} from "../../products/model/product";
import {SubOrder} from "./sub-order";

export interface Order {
  id: number;
  product: Product;
  subOrders: SubOrder[];
  startedDate: Date;
  finishedDate: Date;
  orderAmount: number;
  description: string;
}
