import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1683097514442 implements MigrationInterface {
    name = 'addedUserEntity1683097514442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

}
