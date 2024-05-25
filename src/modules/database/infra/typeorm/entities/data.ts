import {
  PrimaryColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

import { v4 as uuidv4 } from "uuid"

@Entity("data")
export class Data {
  @PrimaryColumn()
  id: string

  @Column({ name: "CODCOLIGADA", nullable: true })
  CODCOLIGADA: string

  @Column({ name: "FILIAL_NOME", nullable: true })
  FILIAL_NOME: string

  @Column({ name: "ANOCOMP", type: "numeric", nullable: true })
  ANOCOMP: number

  @Column({ name: "MESCOMP", type: "numeric", nullable: true })
  MESCOMP: number

  @Column({ name: "CHAPA", nullable: true })
  CHAPA: string

  @Column({ name: "NOME", nullable: true })
  NOME: string

  @Column({ name: "CODCCUSTO", nullable: true })
  CODCCUSTO: string

  @Column({ name: "COLIGADA_NOME", nullable: true })
  COLIGADA_NOME: string

  @Column({ name: "CCUSTO", nullable: true })
  CCUSTO: string

  @Column({ name: "SITUACAO_NOME", nullable: true })
  SITUACAO_NOME: string

  @Column({ name: "DATAADMISSAO", nullable: true, type: "date" })
  DATAADMISSAO: Date

  @Column({ name: "DATADEMISSAO", nullable: true, type: "date" })
  DATADEMISSAO: Date

  @Column({ name: "EVENTO", nullable: true })
  EVENTO: string

  @Column({ name: "CODCONTADEBITO", nullable: true })
  CODCONTADEBITO: string

  @Column({ name: "DEBITO", nullable: true })
  DEBITO: string

  @Column({ name: "CLASSIF_FUNCIONARIO", nullable: true })
  CLASSIF_FUNCIONARIO: string

  @Column({ name: "VALOR", type: "numeric", nullable: true })
  VALOR: number

  @Column({ name: "telephone", nullable: true })
  telephone: string

  @Column({ name: "date", type: "date" })
  date: Date

  @CreateDateColumn({ name: "created_at", nullable: true, select: false })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at", nullable: true, select: false })
  updatedAt?: Date

  constructor() {
    if (!this.id) this.id = uuidv4()
  }
}
