import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from "@modules/security/use-cases/user/authenticate-user/authenticate-user-use-case"

export class AuthenticateUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { login, password } = request.body

    const result = await container.resolve(AuthenticateUserUseCase).execute(login as string, password as string)

    return response.status(result.statusCode).json(result)
  }
}
