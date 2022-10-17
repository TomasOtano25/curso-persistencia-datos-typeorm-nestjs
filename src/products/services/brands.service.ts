import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/generic.service';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities';

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
}
