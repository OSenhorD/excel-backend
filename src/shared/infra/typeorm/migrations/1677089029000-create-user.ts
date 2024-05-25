import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1677089029000 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    // this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "is_admin",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: true,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "now()",
          },
        ],
      })
    )
  }

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable("users")
  }
}
