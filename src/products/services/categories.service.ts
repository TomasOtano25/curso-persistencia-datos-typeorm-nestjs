import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategorysDto } from '../dtos/categories.dto';
import { Category } from '../entities';

@Injectable()
export class CategoriesService extends GenericService<
  Category,
  CreateCategoryDto,
  UpdateCategorysDto
> {
  constructor(
    @InjectRepository(Category)
    private categoryReposigory: Repository<Category>,
  ) {
    super(categoryReposigory);
  }
}
