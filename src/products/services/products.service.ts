import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({
      id,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    // this.counterId = this.counterId + 1;
    // const newProduct = {
    //   id: this.counterId,
    //   ...payload,
    // };
    // this.products.push(newProduct);
    // return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    // const product = this.findOne(id);
    // if (!product) {
    //   return null;
    // }
    // const productIndex = this.products.findIndex((item) => item.id === id);
    // this.products[productIndex] = {
    //   ...product,
    //   ...payload,
    // };
    // return this.products[productIndex];
  }

  delete(id: number) {
    // const productIndex = this.products.findIndex((item) => item.id === id);
    // if (productIndexs === -1) {
    //   throw new NotFoundException(`Product #${id} not found`);
    // }
    // this.products.splice(productIndex, 1);
    // return this.products;
  }
}
