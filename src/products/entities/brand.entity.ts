import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { Product } from './product.entity';

@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
