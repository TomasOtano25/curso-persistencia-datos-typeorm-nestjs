import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { Customer, User } from './entities';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [],
})
export class UsersModule {}
