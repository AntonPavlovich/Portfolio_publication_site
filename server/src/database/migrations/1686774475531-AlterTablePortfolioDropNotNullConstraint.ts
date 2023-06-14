import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTablePortfolioDropNotNullConstraint1686774475531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table "portfolios" alter column description drop not null `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table "portfolios" alter column description set not null `)
    }

}
