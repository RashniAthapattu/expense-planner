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
import { CreateEarningDto } from 'src/dto/create-earning.dto';
import { UpdateEarningDto } from 'src/dto/update-earning.dto';
import { EarningsService } from 'src/service/earnings/earnings.service';

@Controller('earning')
export class EarningController {
  constructor(private readonly earningService: EarningsService) {}

  @Post()
  async createEarning(
    @Res() response,
    @Body() createEarningDto: CreateEarningDto,
  ) {
    try {
      const newEarning =
        await this.earningService.createEarning(createEarningDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Earning has been created successfully',
        newEarning,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Earning not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateEarning(
    @Res() response,
    @Param('id') earningId: string,
    @Body() updateEarningDto: UpdateEarningDto,
  ) {
    try {
      const existingEarning = await this.earningService.updateEarning(
        earningId,
        updateEarningDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Earning has been successfully updated',
        existingEarning,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getEarnings(@Res() response) {
    try {
      const earningData = await this.earningService.getAllEarnings();
      return response.status(HttpStatus.OK).json({
        message: 'All earnings data found successfully',
        earningData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getEarning(@Res() response, @Param('id') earningId: string) {
    try {
      const existingEarning = await this.earningService.getEarning(earningId);
      return response.status(HttpStatus.OK).json({
        message: 'Earning found successfully',
        existingEarning,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteEarning(@Res() response, @Param('id') earningId: string) {
    try {
      const deletedEarning = await this.earningService.deleteEarning(earningId);
      return response.status(HttpStatus.OK).json({
        message: 'Earning deleted successfully',
        deletedEarning,
      });
    } catch (err) {
      return await response.status(err.status).json(err.response);
    }
  }
}
