import {
  PrimaryColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

import { v4 as uuidv4 } from "uuid"

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string

  @Column({ name: "name" })
  name: string

  @Column({ name: "email" })
  email: string

  @Column({ name: "password", select: false })
  password: string

  @Column({ name: "avatar", nullable: true })
  avatar?: string

  @Column({ name: "is_admin", default: false })
  isAdmin: boolean

  @Column({ name: "is_active", default: true })
  isActive: boolean

  @CreateDateColumn({ name: "created_at", nullable: true, select: false })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at", nullable: true, select: false })
  updatedAt?: Date

  constructor() {
    if (!this.id) this.id = uuidv4()
  }
}
