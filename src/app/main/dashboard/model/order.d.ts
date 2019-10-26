import {Product} from "../../products/model/product";
import {SubOrder} from "./sub-order";
import {OrderState} from "./order-state.enum";
import {OrderProcess} from "./order-process.enum";

export interface Order {
  id: number;
  state: OrderState;
  product: Product;
  actualProcess: OrderProcess;
  subOrders: SubOrder[];
  startedDate: Date;
  finishedDate: Date;
  orderAmount: number;
  description: string;
}
