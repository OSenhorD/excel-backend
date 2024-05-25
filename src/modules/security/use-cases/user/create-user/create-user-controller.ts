import { Request, Response } from "express"

import { container } from "tsyringe"

import { IUserCreateParam } from "@modules/security/dtos/i-user-dto"

import { CreateUserUseCase } from "@modules/security/use-cases/user/create-user/create-user-use-case"

import { isUUID } from "@utils/utils"

export class CreateUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body as IUserCreateParam

    const result = await container.resolve(CreateUserUseCase).execute({
      name: body?.name || null,
      email: body?.email || null,
      password: body?.password || null,
      avatar: request.file?.filename || null,
      isAdmin: `${body?.isAdmin || false}` == "true",
      isActive: `${body?.isActive || false}` == "true",
    }, request.user)

    return response.status(result.statusCode).json(result)
  }
}
