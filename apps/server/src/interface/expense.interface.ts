export interface IExpense extends Document {
  readonly date: Date;
  readonly description: string;
  readonly amount: string;
  readonly category: string;
}
