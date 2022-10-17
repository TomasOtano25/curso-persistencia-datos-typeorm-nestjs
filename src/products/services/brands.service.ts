import { Injectable } from '@nestjs/common';
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
}
