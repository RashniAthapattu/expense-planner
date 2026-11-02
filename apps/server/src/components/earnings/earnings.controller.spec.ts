import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EarningController } from './earnings.controller';
import { EarningsService } from './earnings.service';

// Minimal Express response mock that records status and body
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('EarningController', () => {
  let controller: EarningController;
  const earningsService = {
    createEarning: jest.fn(),
    getAllEarnings: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarningController],
      providers: [{ provide: EarningsService, useValue: earningsService }],
    }).compile();

    controller = module.get<EarningController>(EarningController);
  });

  it('responds 201 with the new earning', async () => {
    const newEarning = { description: 'Salary', amount: 40000 };
    earningsService.createEarning.mockResolvedValue(newEarning);
    const res = mockResponse();

    await controller.createEarning(res, newEarning);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ newEarning }),
    );
  });

  it('responds 400 when the earning cannot be created', async () => {
    earningsService.createEarning.mockRejectedValue(new Error('db error'));
    const res = mockResponse();

    await controller.createEarning(res, { description: 'Salary', amount: 1 });

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('responds 200 with all earnings', async () => {
    earningsService.getAllEarnings.mockResolvedValue([]);
    const res = mockResponse();

    await controller.getEarnings(res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ earningData: [] }),
    );
  });
});
