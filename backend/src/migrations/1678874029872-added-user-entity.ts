import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1678874029872 implements MigrationInterface {
    name = 'addedUserEntity1678874029872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "order" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "order"`);
    }

}
