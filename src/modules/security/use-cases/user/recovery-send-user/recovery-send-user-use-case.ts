import { inject, injectable } from "tsyringe"

import auth from "@config/auth"
import { sign } from "jsonwebtoken"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"

import {
  authError,
  HttpResponse,
  ok,
  notFound,
} from "@shared/helpers"

import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider"
import { IMailProvider } from "@shared/container/providers/mail-provider/i-mail-provider"

import { getMessages } from "@shared/utils/language"

@injectable()
export class RecoverySendUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private readonly _userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private readonly _dateProvider: IDateProvider,
    @inject("MailProvider")
    private readonly _mailProvider: IMailProvider,
  ) { }

  execute = async (email: string): Promise<HttpResponse> => {
    try {
      const messages = getMessages()

      const userData = await this._userRepository.findByEmail(email)
      if (userData.statusCode != 200) {
        return notFound(messages.emails.not_found)
      }

      const user = userData.data

      const {
        token_recovery_secret,
        token_recovery_expires_in,
        token_recovery_expires_hours,
      } = auth

      const recoveryToken = sign({ email }, token_recovery_secret, {
        subject: user.id,
        expiresIn: token_recovery_expires_in,
      })

      const date = this._dateProvider.addHours(token_recovery_expires_hours)
      const expiresDate = this._dateProvider.format(date)
      await this._userTokenRepository.create({ userId: user.id, token: recoveryToken, refreshToken: recoveryToken, expiresDate })

      await this._mailProvider.sendMail({
        subject: messages.emails.recovery.subject,
        template: "auth-reset-password",
        to: `${email}`,
        variables: {
          name: `${user.name}`,
          link: `${process.env?.APP_FRONT_URL || ""}/new-password?recoveryToken=${recoveryToken}`,
        },
        attachments: [
          {
            filename: "excel-logo.jpg",
            path: "public/imgs/excel-logo.jpg",
            cid: "img-excel-logo.jpg",
          },
        ],
      })

      return ok({})
    } catch (error) {
      return authError(error)
    }
  }
}
