import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1677921053566 implements MigrationInterface {
    name = 'addedUserEntity1677921053566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isLogin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isLogin" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isActive"`);
    }

}
