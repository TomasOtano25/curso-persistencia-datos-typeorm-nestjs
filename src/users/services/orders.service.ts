import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../common/generic.service';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';
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

  async findOne(id: any): Promise<Order> {
    return this.orderRepo.findOne({
      where: { id },
      relations: {
        items: {
          product: true,
          order: true,
        },
      },
    });
  }

  override findAll(params?: FilterOrderDto): Promise<Order[]> {
    if (params) {
      const { limit, offset } = params;
      return this.orderRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return this.orderRepo.find();
  }
}
