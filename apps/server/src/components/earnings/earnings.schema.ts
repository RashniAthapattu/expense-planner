import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Earnings {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  category: string;
}

export const EarningSchema = SchemaFactory.createForClass(Earnings);
