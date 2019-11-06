import {Employee} from "../../employees/model/employee";
import {Order} from "./order";
import {OrderState} from "./order-state.enum";
import {OrderProcess} from "./order-process.enum";
import {Unit} from "./unit";

export interface SubOrder {
  id: number;
  author: Employee;
  state: OrderState;
  customerOrder: Order;
  orderProcess: OrderProcess;
  startedDate: Date;
  finishedDate: Date;
  additionalData: number;
  unit: Unit;
}
