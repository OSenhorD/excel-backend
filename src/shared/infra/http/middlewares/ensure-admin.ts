import {
  NextFunction,
  Request,
  Response,
} from "express"

import { UserRepository } from "@modules/security/infra/typeorm/repositories/user-repository"

import { forbidden } from "@shared/helpers"

export const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.user

  const user = await new UserRepository().get(id, request.user)
  if (!user.data.isAdmin) {
    throw forbidden(new Error("Usuário não é um admin!"))
  }

  return next()
}
