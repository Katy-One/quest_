import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1681920328674 implements MigrationInterface {
    name = 'addedUserEntity1681920328674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_3808dd46b4325e732618398bdc9"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_3808dd46b4325e732618398bdc9" UNIQUE ("taskName")`);
    }

}
