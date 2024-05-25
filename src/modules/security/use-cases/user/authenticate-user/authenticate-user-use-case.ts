import { inject, injectable } from "tsyringe"

import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { IUserTokenRepository } from "@modules/security/repositories/i-user-token-repository"

import { authError, HttpResponse, ok } from "@shared/helpers"
import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider"
import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

import configAuth from "@config/auth"
import configImage from "@config/image"

interface IResponseData {
  token: string
  refreshToken: string
  user: {
    id: string
    name: string
    avatar?: string
    email: string
    isAdmin: boolean
    isActive: boolean
  }
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private readonly _userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private readonly _dateProvider: IDateProvider,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (email: string, password: string): Promise<HttpResponse<IResponseData>> => {
    try {
      const userData = await this._userRepository.findByEmail(email)
      if (userData.statusCode != 200) throw new Error("Email or password incorrect!")

      const user = userData.data

      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) throw new Error("Email or password incorrect!")

      const {
        token_secret,
        token_expires,
        token_refresh_secret,
        token_refresh_expires_in,
        token_refresh_expires_days,
      } = configAuth

      const token = sign({ email }, token_secret, {
        subject: user.id,
        expiresIn: token_expires,
      })

      const refreshToken = sign({ email }, token_refresh_secret, {
        subject: user.id,
        expiresIn: token_refresh_expires_in,
      })

      const expiresDate = this._dateProvider.format(this._dateProvider.addDays(token_refresh_expires_days))
      await this._userTokenRepository.create({ userId: user.id, token, refreshToken, expiresDate })

      user.avatar = user?.avatar ? `${this._storageProvider.url}/uploads/avatar/${user.avatar}` : configImage.noImageAvatar

      const data: IResponseData = {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          isAdmin: user.isAdmin || false,
          isActive: user.isActive || false,
        },
      }

      return ok(data)
    } catch (error) {
      return authError(error)
    }
  }
}
