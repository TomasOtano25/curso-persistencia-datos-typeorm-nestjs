import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService extends GenericService<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {
    super(orderRepo);
  }

  override async create(data: CreateOrderDto): Promise<Order> {
    const order = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  override async update(id: number, changes: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
    });

    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }
}
