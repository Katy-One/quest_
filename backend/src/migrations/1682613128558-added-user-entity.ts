import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1682613128558 implements MigrationInterface {
    name = 'addedUserEntity1682613128558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" ADD "timerId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP COLUMN "timerId"`);
    }

}
