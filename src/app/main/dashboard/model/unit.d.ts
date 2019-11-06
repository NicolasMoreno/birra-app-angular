import {QuantityType} from "./quantity-type.enum";

export interface Unit {
  id: number;
  unitName: string;
  abbreviation: string;
  quantityType: QuantityType;
}
