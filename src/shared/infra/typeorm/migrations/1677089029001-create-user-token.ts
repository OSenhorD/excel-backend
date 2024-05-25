import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserToken1677089029001 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: "user_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "refresh_token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expires_date",
            type: "timestamp",
            isNullable: false,
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
        foreignKeys: [
          {
            name: "FKUsersUserTokensUserId",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    )
  }

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable("user_tokens")
  }
}
