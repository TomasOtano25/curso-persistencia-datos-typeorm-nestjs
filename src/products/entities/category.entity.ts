import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
