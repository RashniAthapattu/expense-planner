export type AmountType = "expense" | "earning";

export interface IAddAmounts {
  description: string;
  amount: number;
  type: AmountType;
}
