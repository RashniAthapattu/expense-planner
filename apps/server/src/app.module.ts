import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './components/expenses/expense.schema';
import { EarningSchema } from './components/earnings/earnings.schema';
import { EarningController } from './components/earnings/earnings.controller';
import { EarningsService } from './components/earnings/earnings.service';
import { ExpenseController } from './components/expenses/expense.controller';
import { ExpensesService } from './components/expenses/expense.service';
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
