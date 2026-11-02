import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpensesService } from './expense.service';

// Minimal Express response mock that records status and body
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ExpenseController', () => {
  let controller: ExpenseController;
  const expensesService = {
    createExpense: jest.fn(),
    getAllExpenses: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [{ provide: ExpensesService, useValue: expensesService }],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('responds 201 with the new expense', async () => {
    const newExpense = { description: 'Rent', amount: 40000 };
    expensesService.createExpense.mockResolvedValue(newExpense);
    const res = mockResponse();

    await controller.createExpense(res, newExpense);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ newExpense }),
    );
  });

  it('responds 400 when the expense cannot be created', async () => {
    expensesService.createExpense.mockRejectedValue(new Error('db error'));
    const res = mockResponse();

    await controller.createExpense(res, { description: 'Rent', amount: 1 });

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('responds 200 with all expenses', async () => {
    expensesService.getAllExpenses.mockResolvedValue([]);
    const res = mockResponse();

    await controller.getExpenses(res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ expenseData: [] }),
    );
  });
});
