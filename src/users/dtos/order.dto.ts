import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { FilterPagination } from 'src/common/dtos/filter-pagination';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto extends FilterPagination {}
