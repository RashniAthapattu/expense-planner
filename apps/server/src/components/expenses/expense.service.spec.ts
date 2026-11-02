import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ExpensesService } from './expense.service';

const expense = { _id: 'abc123', description: 'Groceries', amount: 2500 };

describe('ExpensesService', () => {
  let service: ExpensesService;
  const save = jest.fn();
  // Mongoose model mock: callable with `new`, plus the static query methods
  const expenseModel: any = jest.fn().mockImplementation(() => ({ save }));
  expenseModel.find = jest.fn();
  expenseModel.findById = jest.fn();
  expenseModel.findByIdAndUpdate = jest.fn();
  expenseModel.findByIdAndDelete = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        { provide: getModelToken('Expense'), useValue: expenseModel },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('creates an expense', async () => {
    save.mockResolvedValue(expense);
    await expect(
      service.createExpense({ description: 'Groceries', amount: 2500 }),
    ).resolves.toEqual(expense);
    expect(expenseModel).toHaveBeenCalledWith({
      description: 'Groceries',
      amount: 2500,
    });
  });

  it('returns all expenses', async () => {
    expenseModel.find.mockResolvedValue([expense]);
    await expect(service.getAllExpenses()).resolves.toEqual([expense]);
  });

  it('returns an empty list when there are no expenses', async () => {
    expenseModel.find.mockResolvedValue([]);
    await expect(service.getAllExpenses()).resolves.toEqual([]);
  });

  it('returns one expense by id', async () => {
    expenseModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(expense),
    });
    await expect(service.getExpense('abc123')).resolves.toEqual(expense);
  });

  it('throws NotFound when the expense does not exist', async () => {
    expenseModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });
    await expect(service.getExpense('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates an expense', async () => {
    const updated = { ...expense, amount: 3000 };
    expenseModel.findByIdAndUpdate.mockResolvedValue(updated);
    await expect(
      service.updateExpense('abc123', {
        description: 'Groceries',
        amount: 3000,
      }),
    ).resolves.toEqual(updated);
  });

  it('throws NotFound when deleting a missing expense', async () => {
    expenseModel.findByIdAndDelete.mockResolvedValue(null);
    await expect(service.deleteExpense('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
