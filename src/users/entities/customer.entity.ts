import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/BaseEntity';
import { User } from './user.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer)
  user: User;
}
