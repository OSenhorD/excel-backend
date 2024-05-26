import { inject, injectable } from "tsyringe"

import { IUserGetRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (id: string): Promise<HttpResponse<IUserGetRes>> => {
    const userData = await this._userRepository.get(id)
    if (userData.statusCode != 200) return userData

    userData.data.avatar = !userData.data?.avatar ? null : `${this._storageProvider.url}/uploads/avatar/${userData.data.avatar}`

    return userData
  }
}
