import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1681915494109 implements MigrationInterface {
    name = 'addedUserEntity1681915494109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD "taskId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd" FOREIGN KEY ("taskId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
