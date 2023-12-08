import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDateString()
  @IsNotEmpty()
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
