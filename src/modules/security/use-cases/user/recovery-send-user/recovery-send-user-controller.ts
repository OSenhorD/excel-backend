import { Request, Response } from "express"
import { container } from "tsyringe"

import { RecoverySendUserUseCase } from "@modules/security/use-cases/user/recovery-send-user/recovery-send-user-use-case"

export class RecoverySendController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { login } = request.body

    const result = await container.resolve(RecoverySendUserUseCase).execute(login)

    return response.status(result.statusCode).json(result)
  }
}
