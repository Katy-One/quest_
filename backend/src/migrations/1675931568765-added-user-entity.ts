import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1675931568765 implements MigrationInterface {
    name = 'addedUserEntity1675931568765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_da2419796cd8a0323f900fbc1c9" UNIQUE ("gameName")`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finalMessage" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "finalMessage" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_da2419796cd8a0323f900fbc1c9"`);
    }

}
