import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { FilterPagination } from 'src/common/dtos/filter-pagination';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomerDto extends FilterPagination {}
