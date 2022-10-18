import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCategories1666123038340 implements MigrationInterface {
  name = 'updateCategories1666123038340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "udpated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "categoriesId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "categoriesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "udpated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "created_at"`,
    );
  }
}
