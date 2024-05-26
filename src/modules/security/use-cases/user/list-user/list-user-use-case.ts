import { inject, injectable } from "tsyringe"

import { IUserListRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponseList } from "@shared/helpers"

import { ISearch } from "@interfaces/shared"

@injectable()
export class ListUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
  ) { }

  execute = async (page: ISearch): Promise<HttpResponseList<IUserListRes[]>> => {
    const items = await this._userRepository.list({
      search: page?.search,
      page: page?.page,
      pageSize: page?.pageSize,
      params: page?.params,
    })
    if (items.statusCode != 200) return items

    return items
  }
}
