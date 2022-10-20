import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'udpated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
