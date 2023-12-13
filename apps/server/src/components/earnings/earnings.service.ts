import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEarning } from './earning.interface';
import { CreateEarningDto } from './dto/create-earning.dto';
import { UpdateEarningDto } from './dto/update-earning.dto';
@Injectable()
export class EarningsService {
  constructor(@InjectModel('Earning') private earningModel: Model<IEarning>) {}

  async createEarning(createEarningDto: CreateEarningDto): Promise<IEarning> {
    const newEarning = new this.earningModel(createEarningDto);
    return newEarning.save();
  }
  async updateEarning(
    earningId: string,
    updateEarningDto: UpdateEarningDto,
  ): Promise<IEarning> {
    const existingEarning = await this.earningModel.findByIdAndUpdate(
      earningId,
      updateEarningDto,
      { new: true },
    );
    if (!existingEarning) {
      throw new NotFoundException(`Earning #${earningId} not found`);
    }
    return existingEarning;
  }
  async getAllEarnings(): Promise<IEarning[]> {
    const earningData = await this.earningModel.find();
    if (!earningData || earningData.length == 0) {
      throw new NotFoundException('Earnings data not found!');
    }
    return earningData;
  }
  async getEarning(earningId: string): Promise<IEarning> {
    const existingEarning = await this.earningModel.findById(earningId).exec();
    if (!existingEarning) {
      throw new NotFoundException(`Earning #${earningId} not found`);
    }
    return existingEarning;
  }
  async deleteEarning(earningId: string) {
    const deletedEarning = await this.earningModel.findByIdAndDelete(earningId);
    if (!deletedEarning) {
      throw new NotFoundException(`Earning #${earningId} not found`);
    }
    return deletedEarning;
  }
}
