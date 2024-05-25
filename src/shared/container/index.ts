import { container } from "tsyringe"

import "@shared/container/providers"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { UserRepository } from "@modules/security/infra/typeorm/repositories/user-repository"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"
import { UserTokenRepository } from "@modules/security/infra/typeorm/repositories/user-token-repository"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"
import { DataRepository } from "@modules/database/infra/typeorm/repositories/data-repository"

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)
container.registerSingleton<IUserTokenRepository>("UserTokenRepository", UserTokenRepository)

container.registerSingleton<IDataRepository>("DataRepository", DataRepository)
