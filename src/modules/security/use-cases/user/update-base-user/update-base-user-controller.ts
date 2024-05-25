import { Request, Response } from "express"

import { container } from "tsyringe"

import { UpdateBaseUserUseCase } from "@modules/security/use-cases/user/update-base-user/update-base-user-use-case"

export class UpdateBaseUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params
    const { name, email } = request.body

    const result = await container.resolve(UpdateBaseUserUseCase).execute(id, name, email, request.user)

    return response.status(result.statusCode).json(result)
  }
}
