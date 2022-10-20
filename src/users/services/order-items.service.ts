import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem) private itemsRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const orderItem = new OrderItem();
    orderItem.quantity = data.quantity;

    if (data.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: data.orderId },
      });
      orderItem.order = order;
    }

    if (data.productId) {
      const product = await this.productRepo.findOne({
        where: { id: data.productId },
      });
      orderItem.product = product;
    }

    return this.itemsRepo.save(orderItem);
  }

  async update(changes: UpdateOrderItemDto) {
    const orderItem = await this.itemsRepo.findOne({
      where: { id: changes.productId },
    });

    if (changes.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: changes.orderId },
      });
      orderItem.order = order;
    }

    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      orderItem.product = product;
    }

    this.itemsRepo.merge(orderItem, changes);

    return this.itemsRepo.create(orderItem);
  }

  async remove(id: number) {
    const orderItem = await this.itemsRepo.findOne({
      where: { id },
    });
    console.log(orderItem);
    if (!orderItem) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.itemsRepo.delete(id);
  }
}
