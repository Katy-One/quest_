import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1678868328529 implements MigrationInterface {
    name = 'addedUserEntity1678868328529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    }

}
