import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities';

interface Options {
  relations?: FindOptionsRelationByString | FindOptionsRelations<Brand>;
}

@Injectable()
export class BrandsService extends GenericService<
  Brand,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {
    super(brandRepo);
  }

  override async findOne(id: any): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async findOneWithOptions(id: any, options?: Options): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      relations: options?.relations || null,
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }
}
