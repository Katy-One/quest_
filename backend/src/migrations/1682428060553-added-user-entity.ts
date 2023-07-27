import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1682428060553 implements MigrationInterface {
    name = 'addedUserEntity1682428060553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."game_status_enum" AS ENUM('active', 'disable')`);
        await queryRunner.query(`ALTER TABLE "game" ADD "status" "public"."game_status_enum" NOT NULL DEFAULT 'disable'`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "UQ_1786ddc11e6e542cd0cd1998b8d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "UQ_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."game_status_enum"`);
    }

}
