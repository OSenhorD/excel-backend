import { inject, injectable } from "tsyringe"

import auth from "@config/auth"
import { verify } from "jsonwebtoken"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"

import {
  HttpResponse,
  ok,
  notFound,
  noToken,
} from "@shared/helpers"

import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider"

import { getMessages } from "@shared/utils/language"

@injectable()
export class RecoveryIsValidTokenUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private readonly _userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private readonly _dateProvider: IDateProvider,
  ) { }

  execute = async (token: string): Promise<HttpResponse<boolean>> => {
    try {
      const messages = getMessages()

      const { sub: userId } = verify(token, auth.token_recovery_secret) as { sub: string }

      const currentUser = await this._userRepository.get(userId, null)
      if (currentUser.statusCode != 200) {
        throw notFound(messages.user.not_found)
      }

      const date = this._dateProvider.now()

      const currentToken = await this._userTokenRepository.isValidToken(userId, token, date)
      if (!currentToken) throw noToken()

      return ok(true)
    } catch (error) {
      console.log("RecoveryIsValidTokenUserUseCase execute")
      console.log(error)
      return noToken()
    }
  }
}
