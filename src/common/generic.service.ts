import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

class BaseEntity {
  public id: number;
}

export abstract class GenericService<
  Entity extends BaseEntity,
  Dto,
  Partial_Dto,
> {
  private readonly genericRepository: Repository<Entity>;

  constructor(genericRepository: Repository<Entity>) {
    this.genericRepository = genericRepository;
  }

  async create(data: Dto): Promise<Entity[] | Entity> {
    const newItem = this.genericRepository.create(data as any);
    return this.genericRepository.save(newItem);
  }

  async update(id: any, changes: Partial_Dto): Promise<Entity> {
    const foundItem = await this.findOne(id);
    this.genericRepository.merge(foundItem, changes as any);
    return this.genericRepository.save(foundItem);
  }

  async remove(id: any): Promise<boolean> {
    await this.findOne(id);
    this.genericRepository.delete(id);
    return true;
  }

  async findOne(id: any): Promise<Entity> {
    const item = await this.genericRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  findAll(): Promise<Entity[]> {
    return this.genericRepository.find();
  }
}
