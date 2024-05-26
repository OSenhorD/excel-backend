import {
  NextFunction,
  Request,
  Response,
} from "express"

import auth from "@config/auth"

import { verify } from "jsonwebtoken"

import { UserRepository } from "@modules/security/infra/typeorm/repositories/user-repository"
import { UserTokenRepository } from "@modules/security/infra/typeorm/repositories/user-token-repository"

import { authError, noToken } from "@shared/helpers"

import { dateProvider } from "@shared/utils/date"
import { getMessages } from "@shared/utils/language"

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const messages = getMessages()

    const authHeader = request?.headers?.authorization
    if (!authHeader) throw noToken()

    const [, token] = authHeader.split(" ")

    const { sub: userId } = verify(token, auth.token_secret) as { sub: string }

    const currentUser = await new UserRepository().get(userId)
    if (currentUser.statusCode != 200) throw authError(new Error(messages.user.not_found))

    const currentToken = await new UserTokenRepository().isValidToken(userId, token, dateProvider.now())
    if (!currentToken) throw noToken()

    const user = currentUser.data

    request.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    }

    next()
  } catch (error) {
    throw error
  }
}
