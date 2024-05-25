import { Request, Response } from "express"

import { container } from "tsyringe"

import { IUserUpdateParam } from "@modules/security/dtos/i-user-dto"

import { UpdateUserUseCase } from "@modules/security/use-cases/user/update-user/update-user-use-case"

import { isUUID } from "@utils/utils"

export class UpdateUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params
    const body = request.body as IUserUpdateParam

    const result = await container.resolve(UpdateUserUseCase).execute(id, {
      name: body?.name || null,
      email: body?.email || null,
      password: body?.password || null,
      avatar: request.file?.filename || body.avatar || null,
      isAdmin: `${body?.isAdmin || false}` == "true",
      isActive: `${body?.isActive || false}` == "true",
    }, request.user)

    return response.status(result.statusCode).json(result)
  }
}
