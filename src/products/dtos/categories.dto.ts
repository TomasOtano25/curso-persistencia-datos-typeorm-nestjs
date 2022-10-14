import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategorysDto extends PartialType(CreateCategoryDto) {}
