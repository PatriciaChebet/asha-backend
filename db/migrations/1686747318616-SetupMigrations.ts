import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupMigrations1686747318616 implements MigrationInterface {
    name = 'SetupMigrations1686747318616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "stage" "public"."tasks_stage_enum" NOT NULL DEFAULT 'backlog', "projectId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b8affb85a578309de603c525994" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8672b44ecc490cd7a7f214595" ON "tags" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92e67dc508c705dd66c9461557" ON "tags" ("userId") `);
        await queryRunner.query(`CREATE TABLE "owners" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_37b0f8a55ca971ad12122c57713" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3d24bb52f97d5045ec28608b5" ON "owners" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0019fb373f92b703efc13c90a" ON "owners" ("userId") `);
        await queryRunner.query(`CREATE TABLE "accountable" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_60abf44928c685fc793e4d28314" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6653d51060e5ed2af4a5816603" ON "accountable" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_136c4999fae298c224a2a02535" ON "accountable" ("userId") `);
        await queryRunner.query(`CREATE TABLE "subscribers" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_5a13bec0d083bf08371bf44956d" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fc21c48a1f129e5d305eaf4ce" ON "subscribers" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e82da94a504e2d6dff5c9f393" ON "subscribers" ("userId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_e8672b44ecc490cd7a7f214595c" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_92e67dc508c705dd66c94615576" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "FK_e3d24bb52f97d5045ec28608b51" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "FK_e0019fb373f92b703efc13c90af" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accountable" ADD CONSTRAINT "FK_6653d51060e5ed2af4a58166036" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accountable" ADD CONSTRAINT "FK_136c4999fae298c224a2a02535f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subscribers" ADD CONSTRAINT "FK_6fc21c48a1f129e5d305eaf4cee" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subscribers" ADD CONSTRAINT "FK_3e82da94a504e2d6dff5c9f393f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribers" DROP CONSTRAINT "FK_3e82da94a504e2d6dff5c9f393f"`);
        await queryRunner.query(`ALTER TABLE "subscribers" DROP CONSTRAINT "FK_6fc21c48a1f129e5d305eaf4cee"`);
        await queryRunner.query(`ALTER TABLE "accountable" DROP CONSTRAINT "FK_136c4999fae298c224a2a02535f"`);
        await queryRunner.query(`ALTER TABLE "accountable" DROP CONSTRAINT "FK_6653d51060e5ed2af4a58166036"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "FK_e0019fb373f92b703efc13c90af"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "FK_e3d24bb52f97d5045ec28608b51"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_92e67dc508c705dd66c94615576"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_e8672b44ecc490cd7a7f214595c"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e82da94a504e2d6dff5c9f393"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fc21c48a1f129e5d305eaf4ce"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_136c4999fae298c224a2a02535"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6653d51060e5ed2af4a5816603"`);
        await queryRunner.query(`DROP TABLE "accountable"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0019fb373f92b703efc13c90a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3d24bb52f97d5045ec28608b5"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92e67dc508c705dd66c9461557"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8672b44ecc490cd7a7f214595"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
