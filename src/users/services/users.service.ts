import { Injectable } from '@nestjs/common';

import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products.service';
import { GenericService } from 'src/common/generic.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService extends GenericService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
  ) {
    super(userRepo);
  }

  async getOrdersByUser(id: number): Promise<Order[]> {
    const user = await this.findOne(id);
    return [
      {
        date: new Date(),
        user,
        products: await this.productsService.findAll(),
      },
    ];
  }
}
