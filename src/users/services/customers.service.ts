import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities';

@Injectable()
export class CustomersService extends GenericService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {
    super(customerRepo);
  }
}
