import { inject, injectable } from "tsyringe"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
  ) { }

  execute = async (id: string): Promise<HttpResponse> => {
    const result = await this._userRepository.delete(id)
    if (result.statusCode != 204) return result

    return result
  }
}
