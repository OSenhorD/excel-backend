import { Request, Response } from "express"

import { container } from "tsyringe"

import { GetUserUseCase } from "@modules/security/use-cases/user/get-user/get-user-use-case"

export class GetUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params

    const result = await container.resolve(GetUserUseCase).execute(id)

    return response.status(result.statusCode).json(result)
  }
}
