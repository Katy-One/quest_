import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1681908840514 implements MigrationInterface {
    name = 'addedUserEntity1681908840514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1bbe3ee8723b748e7ed9aae8657"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userGameId"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_1786ddc11e6e542cd0cd1998b8d"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userGameId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1bbe3ee8723b748e7ed9aae8657" FOREIGN KEY ("userGameId") REFERENCES "user_game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
