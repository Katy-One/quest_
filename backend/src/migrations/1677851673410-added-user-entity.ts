import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1677851673410 implements MigrationInterface {
    name = 'addedUserEntity1677851673410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4ad0dcdcd6b1d348407ae324fd0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_game"`);
    }

}
