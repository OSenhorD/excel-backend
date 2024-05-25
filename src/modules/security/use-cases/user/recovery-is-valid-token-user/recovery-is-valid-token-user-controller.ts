import { Request, Response } from "express"

import { container } from "tsyringe"

import { RecoveryIsValidTokenUserUseCase } from "@modules/security/use-cases/user/recovery-is-valid-token-user/recovery-is-valid-token-user-use-case"

export class RecoveryIsValidTokenController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { token } = request.body

    const result = await container.resolve(RecoveryIsValidTokenUserUseCase).execute(token)

    return response.status(result.statusCode).json(result)
  }
}
