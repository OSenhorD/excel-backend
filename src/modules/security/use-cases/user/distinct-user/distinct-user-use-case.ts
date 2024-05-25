import { inject, injectable } from "tsyringe"

import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

@injectable()
export class DistinctUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
  ) { }

  execute = async (column: string): Promise<HttpResponse<string[]>> => {
    const items = await this._userRepository.distinct(column)
    if (items.statusCode != 200) return items

    return items
  }
}
