import {OrderProcess} from "./order-process.enum";
import {OrderState} from "./order-state.enum";
import {Order} from "./order";

export class OrderChangeModel {
  static from(order: Order, value: number, state: OrderState): OrderChangeModel {
    return new OrderChangeModel(order.id, value, order.actualProcess, state);
  }

  constructor(
    public customerOrderId: number,
    public data: number,
    public process: OrderProcess,
    public state: OrderState
  ) {
  }

}
