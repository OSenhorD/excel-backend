import { Request, Response } from "express"
import { container } from "tsyringe"

import { RecoveryNewPasswordUserUseCase } from "@modules/security/use-cases/user/recovery-new-password-user/recovery-new-password-user-use-case"
import { RecoveryIsValidTokenUserUseCase } from "@modules/security/use-cases/user/recovery-is-valid-token-user/recovery-is-valid-token-user-use-case"

export class RecoveryNewPasswordUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { token, password } = request.body

    const isValidToken = await container.resolve(RecoveryIsValidTokenUserUseCase).execute(token)
    if (isValidToken.statusCode != 200) {
      return response.status(isValidToken.statusCode).json(isValidToken)
    }

    const result = await container.resolve(RecoveryNewPasswordUserUseCase).execute(token, password)

    return response.status(result.statusCode).json(result)
  }
}
