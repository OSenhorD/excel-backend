import {
  PrimaryColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"

import { v4 as uuidv4 } from "uuid"

import { User } from "@modules/security/infra/typeorm/entities/user"

@Entity("user_tokens")
export class UserToken {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  userId: string

  @Column({ name: "token", nullable: false })
  token: string

  @Column({ name: "refresh_token", nullable: false })
  refreshToken: string

  @Column({ name: "expires_date", nullable: false, type: "timestamptz" })
  expiresDate: string

  @CreateDateColumn({ name: "created_at", nullable: true, select: false })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at", nullable: true, select: false })
  updatedAt?: Date

  constructor() {
    if (!this.id) this.id = uuidv4()
  }
}
