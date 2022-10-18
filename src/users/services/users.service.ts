import { Injectable, NotFoundException } from '@nestjs/common';

import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { ProductsService } from '../../products/services/products.service';
import { GenericService } from '../../common/generic.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { CustomersService } from '../services/customers.service';

@Injectable()
export class UsersService extends GenericService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private customerService: CustomersService,
  ) {
    super(userRepo);
  }

  override async create(data: CreateUserDto): Promise<User[] | User> {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      if (!customer) {
        throw new NotFoundException(`Customer #${data.customerId} not found`);
      }
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  override findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async getOrdersByUser(id: number): Promise<Order[]> {
    const user = await this.findOne(id);
    return null;
    // return [
    //   {
    //     date: new Date(),
    //     user,
    //     products: await this.productsService.findAll(),
    //   },
    // ];
  }
}
