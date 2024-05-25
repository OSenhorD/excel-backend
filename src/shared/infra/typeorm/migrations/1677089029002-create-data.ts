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
            isNullable: true,
          },
          {
            name: "FILIAL_NOME",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ANOCOMP",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "MESCOMP",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "CHAPA",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "NOME",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "CODCCUSTO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "COLIGADA_NOME",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "CCUSTO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "SITUACAO_NOME",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "DATAADMISSAO",
            type: "date",
            isNullable: true,
          },
          {
            name: "DATADEMISSAO",
            type: "date",
            isNullable: true,
          },
          {
            name: "EVENTO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "CODCONTADEBITO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "DEBITO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "CLASSIF_FUNCIONARIO",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "VALOR",
            type: "numeric",
            isNullable: true,
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
        indices: [
          {
            name: "data_select_basic",
            columnNames: ["CHAPA", "NOME", "CODCCUSTO"],
          },
        ],
      })
    )
  }

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable("data")
  }
}
