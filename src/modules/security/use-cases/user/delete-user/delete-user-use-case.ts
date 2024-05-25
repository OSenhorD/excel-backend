import { inject, injectable } from "tsyringe"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IUser } from "@interfaces/shared"

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
  ) { }

  execute = async (id: string, user: IUser): Promise<HttpResponse> => {
    const result = await this._userRepository.delete(id, user)
    if (result.statusCode != 204) return result

    return result
  }
}
