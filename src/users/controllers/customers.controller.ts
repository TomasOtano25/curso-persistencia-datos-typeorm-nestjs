import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customer.dto';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Get()
  getCustomers(@Query() params: FilterCustomerDto) {
    return this.customersService.findAll(params);
  }

  @Post()
  create(@Body() data: CreateCustomerDto) {
    return this.customersService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
