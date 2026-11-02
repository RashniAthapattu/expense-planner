import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EarningsService } from './earnings.service';

const earning = { _id: 'abc123', description: 'Salary', amount: 50000 };

describe('EarningsService', () => {
  let service: EarningsService;
  const save = jest.fn();
  // Mongoose model mock: callable with `new`, plus the static query methods
  const earningModel: any = jest.fn().mockImplementation(() => ({ save }));
  earningModel.find = jest.fn();
  earningModel.findById = jest.fn();
  earningModel.findByIdAndUpdate = jest.fn();
  earningModel.findByIdAndDelete = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EarningsService,
        { provide: getModelToken('Earning'), useValue: earningModel },
      ],
    }).compile();

    service = module.get<EarningsService>(EarningsService);
  });

  it('creates an earning', async () => {
    save.mockResolvedValue(earning);
    await expect(
      service.createEarning({ description: 'Salary', amount: 50000 }),
    ).resolves.toEqual(earning);
    expect(earningModel).toHaveBeenCalledWith({
      description: 'Salary',
      amount: 50000,
    });
  });

  it('returns all earnings', async () => {
    earningModel.find.mockResolvedValue([earning]);
    await expect(service.getAllEarnings()).resolves.toEqual([earning]);
  });

  it('returns an empty list when there are no earnings', async () => {
    earningModel.find.mockResolvedValue([]);
    await expect(service.getAllEarnings()).resolves.toEqual([]);
  });

  it('returns one earning by id', async () => {
    earningModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(earning),
    });
    await expect(service.getEarning('abc123')).resolves.toEqual(earning);
  });

  it('throws NotFound when the earning does not exist', async () => {
    earningModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });
    await expect(service.getEarning('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates an earning', async () => {
    const updated = { ...earning, amount: 55000 };
    earningModel.findByIdAndUpdate.mockResolvedValue(updated);
    await expect(
      service.updateEarning('abc123', { description: 'Salary', amount: 55000 }),
    ).resolves.toEqual(updated);
  });

  it('throws NotFound when deleting a missing earning', async () => {
    earningModel.findByIdAndDelete.mockResolvedValue(null);
    await expect(service.deleteEarning('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
