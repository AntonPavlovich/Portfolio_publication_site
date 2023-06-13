import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToOneRelationBetweenPortfolioAndUserTables1686691229693 implements MigrationInterface {
    name = 'AddManyToOneRelationBetweenPortfolioAndUserTables1686691229693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5"`);
        await queryRunner.query(`ALTER TABLE "portfolios" DROP COLUMN "userId"`);
    }

}
