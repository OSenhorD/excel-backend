import { Request, Response } from "express"

import { container } from "tsyringe"

import { UpdatePasswordUserUseCase } from "@modules/security/use-cases/user/update-password-user/update-password-user-use-case"

export class UpdatePasswordUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params
    const { password } = request.body

    const result = await container.resolve(UpdatePasswordUserUseCase).execute(id, password)

    return response.status(result.statusCode).json(result)
  }
}
