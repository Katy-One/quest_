import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1681980547601 implements MigrationInterface {
    name = 'addedUserEntity1681980547601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "UQ_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "UQ_3c152ce0c89dcc15e521ebc49cd" UNIQUE ("taskId")`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_3c152ce0c89dcc15e521ebc49cd" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}