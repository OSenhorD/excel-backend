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

import { ISearch } from "@interfaces/shared"

export interface IUserRepository {
  list(data: ISearch): Promise<HttpResponseList<IUserListRes[]>>
  get(id: string): Promise<HttpResponse<IUserGetRes>>

  create(item: IUserCreateParam): Promise<HttpResponse<IUserCreateRes>>
  update(id: string, item: IUserUpdateParam): Promise<HttpResponse<IUserUpdateRes>>
  delete(id: string): Promise<HttpResponse>

  distinct(column: string): Promise<HttpResponse<string[]>>

  findByEmail(email: string): Promise<HttpResponse<IUserByEmailRes>>

  updatePassword(id: string, password: string): Promise<HttpResponse>
  updateAvatar(id: string, avatar: string): Promise<HttpResponse<IUserUpdateAvatarRes>>
  updateBase(id: string, name: string, email: string): Promise<HttpResponse<IUserUpdateBaseRes>>
}
