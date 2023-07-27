import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1682074922641 implements MigrationInterface {
    name = 'addedUserEntity1682074922641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "UQ_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "UQ_1786ddc11e6e542cd0cd1998b8d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
