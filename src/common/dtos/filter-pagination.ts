import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterPagination {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;
}
