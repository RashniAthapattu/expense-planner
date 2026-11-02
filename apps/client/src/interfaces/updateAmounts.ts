import { AmountType } from "./addAmounts";

export interface IUpdateAmounts {
  id: string;
  type: AmountType;
  description: string;
  amount: number;
}
