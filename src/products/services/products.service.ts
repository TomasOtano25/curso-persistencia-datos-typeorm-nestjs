import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }

    try {
      return await this.productRepo.save(newProduct);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}`);
    }
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepo.delete(id);
  }
}
