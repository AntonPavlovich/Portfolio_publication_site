import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterImageTableColumnsToFixCharFieldsLength1686777074568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "description" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "originalFileName"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "originalFileName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "url" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "originalFileName"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "originalFileName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "name" character varying NOT NULL`);
    }

}
