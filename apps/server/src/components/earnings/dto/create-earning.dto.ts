import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateEarningDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
