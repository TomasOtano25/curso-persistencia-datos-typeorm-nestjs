import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateOrdersItems1666140088895 implements MigrationInterface {
  name = 'updateOrdersItems1666140088895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" ADD "udpated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP COLUMN "udpated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items" DROP COLUMN "created_at"`,
    );
  }
}
