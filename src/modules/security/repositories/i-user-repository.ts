import {
  IUserByEmailRes,
  IUserCreateParam,
  IUserCreateRes,
  IUserGetRes,
  IUserListRes,
  IUserUpdateParam,
  IUserUpdateAvatarRes,
  IUserUpdateBaseRes,
  IUserUpdateRes,
} from "@modules/security/dtos/i-user-dto"

import { HttpResponse, HttpResponseList } from "@shared/helpers"

import { ISearch, IUser } from "@interfaces/shared"

export interface IUserRepository {
  list(data: ISearch, user: IUser): Promise<HttpResponseList<IUserListRes[]>>
  get(id: string, user: IUser, force?: boolean): Promise<HttpResponse<IUserGetRes>>

  create(item: IUserCreateParam, user: IUser): Promise<HttpResponse<IUserCreateRes>>
  update(id: string, item: IUserUpdateParam, user: IUser): Promise<HttpResponse<IUserUpdateRes>>
  delete(id: string, user: IUser): Promise<HttpResponse>

  findByEmail(email: string): Promise<HttpResponse<IUserByEmailRes>>

  updatePassword(id: string, password: string, user: IUser, force?: boolean): Promise<HttpResponse>
  updateAvatar(id: string, avatar: string, user: IUser): Promise<HttpResponse<IUserUpdateAvatarRes>>
  updateBase(id: string, name: string, email: string, user: IUser): Promise<HttpResponse<IUserUpdateBaseRes>>
}
