import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1677570763740 implements MigrationInterface {
    name = 'addedUserEntity1677570763740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isLogin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isLogin"`);
    }

}
