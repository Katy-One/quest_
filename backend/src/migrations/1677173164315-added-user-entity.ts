import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1677173164315 implements MigrationInterface {
    name = 'addedUserEntity1677173164315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_a8106c0a84d70ecfc3358301c54" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_a8106c0a84d70ecfc3358301c54"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "userId"`);
    }

}
