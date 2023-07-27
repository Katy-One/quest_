import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676304843147 implements MigrationInterface {
    name = 'addedUserEntity1676304843147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hintDescription" character varying NOT NULL, "timeAppear" character varying NOT NULL, "taskId" uuid, CONSTRAINT "PK_8924ac96cb5296b7a69399f0f94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taskName" character varying NOT NULL, "answerFormat" character varying NOT NULL, "description" character varying NOT NULL, "correctAnswer" character varying NOT NULL, "gameId" uuid, CONSTRAINT "UQ_3808dd46b4325e732618398bdc9" UNIQUE ("taskName"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hint" ADD CONSTRAINT "FK_cc73ac8baeb0cbea2d4e71b559c" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_62894ae91b5c54916a09f3c95c4" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_62894ae91b5c54916a09f3c95c4"`);
        await queryRunner.query(`ALTER TABLE "hint" DROP CONSTRAINT "FK_cc73ac8baeb0cbea2d4e71b559c"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "hint"`);
    }

}
