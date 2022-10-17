import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/BaseEntity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

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
