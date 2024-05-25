import { inject, injectable } from "tsyringe"

import auth from "@config/auth"
import { verify } from "jsonwebtoken"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"

import {
  HttpResponse,
  ok,
  noToken,
} from "@shared/helpers"

import { IMailProvider } from "@shared/container/providers/mail-provider/i-mail-provider"
import { getMessages } from "@shared/utils/language"

@injectable()
export class RecoveryNewPasswordUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private readonly _userTokenRepository: IUserTokenRepository,
    @inject("MailProvider")
    private readonly _mailProvider: IMailProvider,
  ) { }

  execute = async (token: string, password: string): Promise<HttpResponse> => {
    try {
      const messages = getMessages()

      const { sub: userId } = verify(token, auth.token_recovery_secret) as { sub: string }

      await this._userTokenRepository.deleteByUserId(userId)

      const result = await this._userRepository.updatePassword(userId, password, null, true)
      if (result.statusCode != 200) return result

      const user = await this._userRepository.get(userId, null)
      if (user.statusCode != 200) return user

      this._mailProvider.sendMail({
        subject: messages.emails.update_password.subject,
        template: "auth-reset-password-success",
        to: `${user.data.email}`,
        variables: {
          name: `${user.data.name}`,
        },
        attachments: [
          {
            filename: "excel-logo.jpg",
            path: "public/imgs/excel-logo.jpg",
            cid: "img-excel-logo.jpg",
          },
        ],
      })

      return ok()
    } catch (error) {
      console.log("RecoveryNewPasswordUserUseCase execute")
      console.log(error)
      return noToken()
    }
  }
}
