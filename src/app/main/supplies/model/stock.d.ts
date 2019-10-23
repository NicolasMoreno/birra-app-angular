import {Supply} from "./supply";

export interface Stock {
  id: number;
  material: Supply;
  storedQuantity: number;
}
