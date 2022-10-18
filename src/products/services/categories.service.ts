import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  In,
  Repository,
} from 'typeorm';
import { CreateCategoryDto, UpdateCategorysDto } from '../dtos/categories.dto';
import { Category } from '../entities';

interface Options {
  relations?: FindOptionsRelationByString | FindOptionsRelations<Category>;
}

@Injectable()
export class CategoriesService extends GenericService<
  Category,
  CreateCategoryDto,
  UpdateCategorysDto
> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  findByIds(ids: number[]) {
    return this.categoryRepository.findBy({ id: In(ids) });
  }

  override async findOne(id: number, options?: Options): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      relations: options?.relations,
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return category;
  }
}
