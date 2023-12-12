import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseController } from './controller/expense/expense.controller';
import { ExpenseSchema } from './schema/expense.schema';
import { ExpensesService } from './service/expense/expense.service';
import { EarningsService } from './service/earnings/earnings.service';
import { EarningController } from './controller/earnings/earnings.controller';
import { EarningSchema } from './schema/earnings.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'expense-manager',
    }),
    MongooseModule.forFeature([
      { name: 'Expense', schema: ExpenseSchema },
      { name: 'Earning', schema: EarningSchema },
    ]),
  ],
  controllers: [AppController, ExpenseController, EarningController],
  providers: [AppService, ExpensesService, EarningsService],
})
export class AppModule {}
