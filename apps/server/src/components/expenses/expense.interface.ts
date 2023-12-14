export interface IExpense extends Document {
  readonly description: string;
  readonly amount: string;
}
