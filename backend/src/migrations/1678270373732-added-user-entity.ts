import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1678270373732 implements MigrationInterface {
    name = 'addedUserEntity1678270373732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_efca7c34243bd941b730135e2c0"`);
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "UQ_efca7c34243bd941b730135e2c0"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_efca7c34243bd941b730135e2c0" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_game" DROP CONSTRAINT "FK_efca7c34243bd941b730135e2c0"`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "UQ_efca7c34243bd941b730135e2c0" UNIQUE ("gameId")`);
        await queryRunner.query(`ALTER TABLE "user_game" ADD CONSTRAINT "FK_efca7c34243bd941b730135e2c0" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
