import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterImagesTableAddNewColumn1686771880458 implements MigrationInterface {
    name = 'AlterImagesTableAddNewColumn1686771880458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "originalFileName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "originalFileName"`);
    }

}
