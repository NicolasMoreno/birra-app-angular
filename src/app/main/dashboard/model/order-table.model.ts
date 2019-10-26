import {OrderState} from "./order-state.enum";
import {OrderProcess} from "./order-process.enum";
import {Order} from "./order";

export class OrderTableModel {
  static from(json: Order): OrderTableModel {
    return new OrderTableModel(
      json.id,
      json.product.name,
      json.state,
      json.actualProcess,
      json.startedDate,
      json.finishedDate,
      json.orderAmount
    );
  }

  constructor (
    public readonly id: number,
    public readonly product: string,
    public readonly status: OrderState,
    public readonly process: OrderProcess,
    public readonly startedDate: Date,
    public readonly finishedDate: Date,
    public readonly orderAmount: number
  ) {}
}
