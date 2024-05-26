import { inject, injectable } from "tsyringe"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

@injectable()
export class UpdatePasswordUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
  ) { }

  execute = async (id: string, password: string): Promise<HttpResponse> => {
    const result = await this._userRepository.updatePassword(id, password)
    if (result.statusCode != 200) return result

    return result
  }
}
