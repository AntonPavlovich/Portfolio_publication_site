import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1686587124271 implements MigrationInterface {
    name = 'CreateUserTable1686587124271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "hashedPassword" character varying NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
