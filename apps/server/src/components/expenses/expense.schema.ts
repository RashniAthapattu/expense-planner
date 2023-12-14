import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
