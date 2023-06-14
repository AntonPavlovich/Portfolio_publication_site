import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentsTable1686779586438 implements MigrationInterface {
    name = 'CreateCommentsTable1686779586438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_20e9126519a4b7740fea914bc20"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "imageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_20e9126519a4b7740fea914bc20" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_6508f19beedb8e87c3a7d2df579" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_6508f19beedb8e87c3a7d2df579"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_20e9126519a4b7740fea914bc20"`);
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_20e9126519a4b7740fea914bc20" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
