import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { Customer, User } from './entities';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  exports: [],
})
export class UsersModule {}
