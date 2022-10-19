import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemsService } from '../services/order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private itemsService: OrderItemsService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }
}
