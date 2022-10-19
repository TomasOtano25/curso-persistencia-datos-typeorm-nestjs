import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  Repository,
  Between,
  FindOptionsWhere,
} from 'typeorm';

import { Product } from '../entities';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

interface Options {
  relations?: FindOptionsRelationByString | FindOptionsRelations<Product>;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      console.log(minPrice, maxPrice);
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number, options?: Options): Promise<Product> {
    const product = await this.productRepo.findOne({
      relations: options?.relations,
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
      const brand = await this.brandsService.findOneWithOptions(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoriesService.findByIds(
        data.categoriesIds,
      );
      newProduct.categories = categories;
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
      const brand = await this.brandsService.findOneWithOptions(
        changes.brandId,
      );
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.categoriesService.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepo.delete(id);
  }

  async removeCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    // Eliminar category
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoriesService.findOne(categoryId);

    if (!category) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }

    product.categories = [...product.categories, category];

    return this.productRepo.save(product);
  }
}
