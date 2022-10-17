import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1666013513775 implements MigrationInterface {
  name = 'addFields1666013513775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "udpated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "udpated_at"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
  }
}
