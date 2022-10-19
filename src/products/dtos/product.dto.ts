import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
  IsEnum,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "product's name" })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber({}, { each: true })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

enum OrderBy {
  price = 'price',
  id = 'id',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

// Query
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;

  @ApiProperty({ enum: ['price', 'id'] })
  @ValidateIf((item) => item.order)
  @IsEnum(OrderBy)
  readonly orderBy: string;

  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsEnum(OrderDirection)
  readonly order: string;

  @IsOptional()
  @IsPositive()
  readonly brandId: number;
}
