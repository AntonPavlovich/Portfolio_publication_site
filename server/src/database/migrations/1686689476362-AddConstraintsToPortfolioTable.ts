import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConstraintsToPortfolioTable1686689476362 implements MigrationInterface {
    name = 'AddConstraintsToPortfolioTable1686689476362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolios" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD "description" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolios" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD "name" character varying NOT NULL`);
    }

}
