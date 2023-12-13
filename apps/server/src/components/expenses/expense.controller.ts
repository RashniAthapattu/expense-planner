import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Post('/addAmount')
  async createExpense(
    @Res() response: any,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    try {
      const newExpense =
        await this.expenseService.createExpense(createExpenseDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Expense has been created successfully',
        newExpense,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Expense not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateExpense(
    @Res() response: any,
    @Param('id') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    try {
      const existingExpense = await this.expenseService.updateExpense(
        expenseId,
        updateExpenseDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Expense has been successfully updated',
        existingExpense,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getExpenses(@Res() response: any) {
    try {
      const expenseData = await this.expenseService.getAllExpenses();
      return response.status(HttpStatus.OK).json({
        message: 'All expenses data found successfully',
        expenseData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getExpense(@Res() response: any, @Param('id') expenseId: string) {
    try {
      const existingExpense = await this.expenseService.getExpense(expenseId);
      return response.status(HttpStatus.OK).json({
        message: 'Expense found successfully',
        existingExpense,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteExpense(@Res() response: any, @Param('id') expenseId: string) {
    try {
      const deletedExpense = await this.expenseService.deleteExpense(expenseId);
      return response.status(HttpStatus.OK).json({
        message: 'Expense deleted successfully',
        deletedExpense,
      });
    } catch (err) {
      return await response.status(err.status).json(err.response);
    }
  }
}
