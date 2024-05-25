import { MoreThanOrEqual, Repository } from "typeorm"

import { UserToken } from "@modules/security/infra/typeorm/entities/user-token"
import { IUserTokenDTO } from "@modules/security/dtos/i-user-token-dto"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"

import AppDataSource from "@shared/infra/typeorm"

import {
  ok,
  noContent,
  serverError,
  HttpResponse,
} from "@shared/helpers"

export class UserTokenRepository implements IUserTokenRepository {
  private readonly _repository: Repository<UserToken> = AppDataSource.getRepository(UserToken)

  create = async (item: IUserTokenDTO): Promise<HttpResponse> => {
    try {
      const newItem = this._repository.create({
        userId: item?.userId,
        token: item?.token,
        refreshToken: item?.refreshToken,
        expiresDate: item?.expiresDate,
      })

      const result = await this._repository.save(newItem)
      return ok(result)
    } catch (error) {
      return serverError(error, "UserTokenRepository create")
    }
  }

  deleteByUserId = async (userId: string): Promise<HttpResponse> => {
    try {
      const tokens = await this._repository
        .createQueryBuilder("use")
        .select([`use.id as "id"`])
        .where("use.userId = :userId", { userId })
        .getRawMany()

      const ids = tokens.map(token => token.id)

      await this._repository.delete(ids)

      return noContent()
    } catch (error) {
      if (error.message.slice(0, 10) === "null value") {
        return serverError(new Error("not null constraint"), "delete")
      }

      return serverError(error, "UserTokenRepository deleteByUserId")
    }
  }

  isValidToken = async (userId: string, token: string, date: Date): Promise<boolean> => {
    try {
      let query = this._repository
        .createQueryBuilder("use")
        .select([`use.id as "id"`])
        .where({
          userId,
          token,
          expiresDate: MoreThanOrEqual(date),
        })

      const item = await query.getRawOne()
      return item?.id != null
    } catch (error) {
      return false
    }
  }
}
