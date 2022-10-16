import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategorysDto } from '../dtos/categories.dto';

import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get()
  getCategories() {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategorysDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const response = await this.categoryService.remove(id);
    return { message: response };
  }
}
