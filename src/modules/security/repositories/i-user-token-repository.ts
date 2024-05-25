import { IUserTokenDTO } from "@modules/security/dtos/i-user-token-dto"

import { HttpResponse } from "@shared/helpers"

export interface IUserTokenRepository {
  create(item: Omit<IUserTokenDTO, "id">): Promise<HttpResponse<IUserTokenDTO>>

  deleteByUserId(userId: string): Promise<HttpResponse>
  isValidToken(userId: string, token: string, date: Date): Promise<boolean>
}
