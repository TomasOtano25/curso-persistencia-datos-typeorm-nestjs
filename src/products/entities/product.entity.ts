import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
@Index(['price', 'stock'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  // @CreateDateColumn({
  //   type: 'timestamptz',
  //   name: 'created_at',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   type: 'timestamptz',
  //   name: 'udpated_at',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;
}
