import { Request, Response } from "express"

import { container } from "tsyringe"

import { DeleteUserUseCase } from "@modules/security/use-cases/user/delete-user/delete-user-use-case"

export class DeleteUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    const result = await container.resolve(DeleteUserUseCase).execute(id)

    return response.status(result.statusCode).send()
  }
}
