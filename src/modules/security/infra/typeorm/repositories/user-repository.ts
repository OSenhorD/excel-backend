import { Repository, Brackets } from "typeorm"

import { hash } from "bcrypt"

import { User } from "@modules/security/infra/typeorm/entities/user"

import {
  IUserByEmailRes,
  IUserCreateRes,
  IUserGetRes,
  IUserListRes,
  IUserUpdateAvatarRes,
  IUserUpdateBaseRes,
  IUserUpdateRes,
  IUserCreateParam,
  IUserUpdateParam,
} from "@modules/security/dtos/i-user-dto"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import AppDataSource from "@shared/infra/typeorm"

import {
  ok,
  okList,
  noContent,
  notFound,
  serverError,
  serverErrorList,
  HttpResponse,
  HttpResponseList,
} from "@shared/helpers"

import { getValidParams } from "@utils/utils"

import { insertWhereParams } from "@utils/typeorm-utils"

import { ISearch, IUser } from "@interfaces/shared"

export class UserRepository implements IUserRepository {
  private readonly _repository: Repository<User> = AppDataSource.getRepository(User)

  list = async ({ search, page, pageSize, params }: ISearch, user: IUser): Promise<HttpResponseList<IUserListRes[]>> => {
    const validParams = getValidParams(params)

    try {
      let query = this._repository
        .createQueryBuilder("use")
        .select([
          `use.id as "id"`,
          `use.name as "name"`,
          `use.email as "email"`,
          `use.isAdmin as "isAdmin"`,
          `use.isActive as "isActive"`,
        ])

      const count = await query.getCount()

      query = insertWhereParams(query, validParams)

      if (search) {
        query = query
          .andWhere(new Brackets(qb => {
            qb.where("CAST(use.name AS VARCHAR) ilike :search", { search: `%${search}%` })
              .orWhere("CAST(use.email AS VARCHAR) ilike :search", { search: `%${search}%` })
              .orWhere("CAST(use.isActive AS VARCHAR) ilike :search", { search: `%${search}%` })
          }))
      }

      query = query
        .addOrderBy("use.isActive", "DESC")
        .addOrderBy("use.isAdmin", "DESC")

      if (!params?.noPagination) {
        query = query
          .offset(pageSize * page)
          .limit(pageSize)
      }

      const items = await query.getRawMany()
      return okList(items, count)
    } catch (error) {
      return serverErrorList(error, "UserRepository list")
    }
  }

  get = async (id: string, user: IUser, force?: boolean): Promise<HttpResponse<IUserGetRes>> => {
    try {
      let query = this._repository
        .createQueryBuilder("use")
        .select([
          `use.id as "id"`,
          `use.name as "name"`,
          `use.email as "email"`,
          `use.avatar as "avatar"`,
          `use.isAdmin as "isAdmin"`,
          `use.isActive as "isActive"`,
        ])
        .where({ id })

      const item = await query.getRawOne()
      if (typeof item === "undefined") return noContent()

      return ok(item)
    } catch (error) {
      return serverError(error, "UserRepository get")
    }
  }

  create = async (item: IUserCreateParam, user: IUser): Promise<HttpResponse<IUserCreateRes>> => {
    try {
      const passwordHash = await hash(item?.password, 8)

      const newItem = this._repository.create({
        name: item?.name,
        email: item?.email,
        password: passwordHash,
        avatar: item?.avatar,
        isAdmin: item?.isAdmin,
        isActive: item?.isActive,
      })

      const result = await this._repository.save(newItem)
      delete result.password

      return ok(result)
    } catch (error) {
      return serverError(error, "UserRepository create")
    }
  }

  update = async (id: string, item: IUserUpdateParam, user: IUser): Promise<HttpResponse<IUserUpdateRes>> => {
    try {
      const data = await this._hasId(id, user)
      if (!data) return notFound()

      const newItem = this._repository.create({
        id,
        name: item?.name,
        email: item?.email,
        avatar: item?.avatar,
        isAdmin: item?.isAdmin,
        isActive: item?.isActive,
      })

      await this._repository.save(newItem)

      return ok(newItem)
    } catch (error) {
      return serverError(error, "UserRepository update")
    }
  }

  delete = async (id: string, user: IUser): Promise<HttpResponse> => {
    try {
      const has = await this._hasId(id, user)
      if (has) return noContent()

      await this._repository.delete(id)

      return noContent()
    } catch (error) {
      if (error.message.slice(0, 10) === "null value") {
        return serverError(new Error("not null constraint"), "delete")
      }

      return serverError(error, "UserRepository delete")
    }
  }

  findByEmail = async (email: string): Promise<HttpResponse<IUserByEmailRes>> => {
    try {
      let query = this._repository
        .createQueryBuilder("use")
        .select([
          `use.id as "id"`,
          `use.name as "name"`,
          `use.email as "email"`,
          `use.password as "password"`,
          `use.avatar as "avatar"`,
          `use.isAdmin as "isAdmin"`,
          `use.isActive as "isActive"`,
        ])
        .where({ email })

      const item = await query.getRawOne()
      if (typeof item === "undefined") return noContent()

      return ok(item)
    } catch (error) {
      return serverError(error, "UserRepository findByEmail")
    }
  }

  updatePassword = async (id: string, password: string, user: IUser, force?: boolean): Promise<HttpResponse> => {
    try {
      const item = await this._hasId(id, user, force)
      if (!item) return notFound()

      const passwordHash = await hash(password, 8)
      const newItem = this._repository.create({ id, password: passwordHash })
      await this._repository.save(newItem)

      return ok({})
    } catch (error) {
      return serverError(error, "UserRepository updatePassword")
    }
  }

  updateAvatar = async (id: string, avatar: string, user: IUser): Promise<HttpResponse<IUserUpdateAvatarRes>> => {
    try {
      const item = await this._hasId(id, user)
      if (!item) return notFound()

      const newItem = this._repository.create({ id, avatar })
      await this._repository.save(newItem)

      return ok(newItem)
    } catch (error) {
      return serverError(error, "UserRepository updateAvatar")
    }
  }

  updateBase = async (id: string, name: string, email: string, user: IUser): Promise<HttpResponse<IUserUpdateBaseRes>> => {
    try {
      const item = await this._hasId(id, user)
      if (!item) return notFound()

      const newItem = this._repository.create({ id, name, email })
      await this._repository.save(newItem)

      return ok(newItem)
    } catch (error) {
      return serverError(error, "UserRepository updateBase")
    }
  }

  private _hasId = async (id: string, user: IUser, force?: boolean): Promise<boolean> => {
    try {
      const data = await this._repository
        .createQueryBuilder("use")
        .select("use.id")
        .where({ id })
        .getRawOne()

      return typeof data != "undefined"
    } catch (error) {
      return false
    }
  }
}
