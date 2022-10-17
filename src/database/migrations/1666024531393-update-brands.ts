import { MigrationInterface, QueryRunner } from "typeorm";

export class updateBrands1666024531393 implements MigrationInterface {
    name = 'updateBrands1666024531393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "udpated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "udpated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
    }

}
