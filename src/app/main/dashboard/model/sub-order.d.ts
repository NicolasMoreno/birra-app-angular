import {Employee} from "../../employees/model/employee";
import {Order} from "./order";
import {OrderState} from "./order-state.enum";
import {OrderProcess} from "./order-process.enum";

export interface SubOrder {
  id: number;
  author: Employee;
  state: OrderState;
  customerOrder: Order;
  process: OrderProcess;
  startedDate: Date;
  finishedDate: Date;
}
