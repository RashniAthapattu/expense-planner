import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { IExpense } from './expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel('Expense') private expenseModel: Model<IExpense>) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<IExpense> {
    const newExpense = new this.expenseModel(createExpenseDto);

    return newExpense.save();
  }
  async updateExpense(
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<IExpense> {
    const existingExpense = await this.expenseModel.findByIdAndUpdate(
      expenseId,
      updateExpenseDto,
      { new: true },
    );
    if (!existingExpense) {
      throw new NotFoundException(`Expense #${expenseId} not found`);
    }
    return existingExpense;
  }
  async getAllExpenses(): Promise<IExpense[]> {
    const expenseData = await this.expenseModel.find();
    if (!expenseData || expenseData.length == 0) {
      throw new NotFoundException('Expenses data not found!');
    }
    return expenseData;
  }
  async getExpense(expenseId: string): Promise<IExpense> {
    const existingExpense = await this.expenseModel.findById(expenseId).exec();
    if (!existingExpense) {
      throw new NotFoundException(`Expense #${expenseId} not found`);
    }
    return existingExpense;
  }
  async deleteExpense(expenseId: string) {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      throw new NotFoundException(`Expense #${expenseId} not found`);
    }
    return deletedExpense;
  }
}
