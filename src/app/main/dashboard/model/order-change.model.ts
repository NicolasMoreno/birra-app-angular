import {OrderProcess} from "./order-process.enum";
import {OrderState} from "./order-state.enum";
import {Order} from "./order";

export class OrderChangeModel {
  static from(order: Order, state: OrderState, value: number, additionalData: number): OrderChangeModel {
    return new OrderChangeModel(order.id, order.actualProcess, state, value, additionalData);
  }

  constructor(
    public customerOrderId: number,
    public process: OrderProcess,
    public state: OrderState,
    public data: number,
    public additionalData: number
  ) {
  }

}
