import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1675932897379 implements MigrationInterface {
    name = 'addedUserEntity1675932897379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "author" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "author" SET NOT NULL`);
    }

}
