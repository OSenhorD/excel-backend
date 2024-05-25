import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateData1677089029002 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: "data",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "CODCOLIGADA",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "FILIAL_NOME",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "ANOCOMP",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "MESCOMP",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "CHAPA",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "NOME",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "CODCCUSTO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "COLIGADA_NOME",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "CCUSTO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "SITUACAO_NOME",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "DATAADMISSAO",
            type: "date",
            isNullable: false,
          },
          {
            name: "DATADEMISSAO",
            type: "date",
            isNullable: false,
          },
          {
            name: "EVENTO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "CODCONTADEBITO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "DEBITO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "CLASSIF_FUNCIONARIO",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "VALOR",
            type: "numeric",
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
      })
    )
  }

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable("data")
  }
}
