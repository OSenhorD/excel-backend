import { Request, Response } from "express"

import { container } from "tsyringe"

import { UpdateAvatarUserUseCase } from "@modules/security/use-cases/user/update-avatar-user/update-avatar-user-use-case"

export class UpdateAvatarUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    const result = await container.resolve(UpdateAvatarUserUseCase).execute(id, request.file?.filename || null)

    return response.status(result.statusCode).json(result)
  }
}
