import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/BaseEntity';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

import { Exclude, Expose } from 'class-transformer';

export const GROUP_ORDER = 'group_order_details';
export const GROUP_ALL_ORDER = 'group_all_orders';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose({ groups: [GROUP_ORDER] })
  get products() {
    if (this.items) {
      const filterNotNull = (item: OrderItem) => !!item;
      const mapProduct = (item: OrderItem) => ({
        quantity: item.quantity,
        ...item.product,
        itemId: item.id,
      });
      return this.items.filter(filterNotNull).map(mapProduct);
    }
    return [];
  }

  @Expose({ groups: [GROUP_ORDER] })
  get total() {
    if (this.items) {
      const filterNotNull = (item: OrderItem) => !!item;
      const reducer = (total: number, item: OrderItem) => {
        const totalItem = item.product.price * item.quantity;
        return total + totalItem;
      };
      return this.items.filter(filterNotNull).reduce(reducer, 0);
    }
    return 0;
  }
}
