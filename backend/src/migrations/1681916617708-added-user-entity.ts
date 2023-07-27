import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1681916617708 implements MigrationInterface {
    name = 'addedUserEntity1681916617708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "UQ_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP COLUMN "taskId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" ADD "taskId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "UQ_3c152ce0c89dcc15e521ebc49cd" UNIQUE ("taskId")`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd" FOREIGN KEY ("taskId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
