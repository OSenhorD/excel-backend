import { Request, Response } from "express"

import { container } from "tsyringe"

import { DistinctUserUseCase } from "@modules/security/use-cases/user/distinct-user/distinct-user-use-case"

export class DistinctUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const column = request.params.column || ""
    const result = await container.resolve(DistinctUserUseCase).execute(column)

    return response.status(result.statusCode).json(result)
  }
}
