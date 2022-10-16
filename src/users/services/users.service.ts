import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
  ) {}
  private users = [
    {
      id: 1,
      name: 'Tomas Garcia',
    },
  ];

  async findAll() {
    const res = await this.clientPg.query('SELECT * FROM tasks');
    console.log(res.rows);

    console.log(this.configService.get('API_KEY'));
    console.log(this.configService.get('DATABASE_NAME'));
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  getOrdersByUser(id: number): Order[] {
    const user = this.findOne(id);
    return [
      {
        date: new Date(),
        user,
        products: this.productsService.findAll(),
      },
    ];
  }
}
