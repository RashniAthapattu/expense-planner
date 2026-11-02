import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './components/expenses/expense.schema';
import { EarningSchema } from './components/earnings/earnings.schema';
import { EarningController } from './components/earnings/earnings.controller';
import { EarningsService } from './components/earnings/earnings.service';
import { ExpenseController } from './components/expenses/expense.controller';
import { ExpensesService } from './components/expenses/expense.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
      { dbName: process.env.MONGODB_DB_NAME ?? 'expense-manager' },
    ),
    MongooseModule.forFeature([
      { name: 'Expense', schema: ExpenseSchema },
      { name: 'Earning', schema: EarningSchema },
    ]),
  ],
  controllers: [AppController, ExpenseController, EarningController],
  providers: [AppService, ExpensesService, EarningsService],
})
export class AppModule {}
