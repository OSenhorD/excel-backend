import { inject, injectable } from "tsyringe"

import { IUserCreateParam, IUserCreateRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (body: IUserCreateParam): Promise<HttpResponse<IUserCreateRes>> => {
    const newUser = await this._userRepository.create({
      name: body?.name,
      email: body?.email,
      password: body?.password,
      avatar: body?.avatar,
      isAdmin: body?.isAdmin,
      isActive: body?.isActive,
    })
    if (newUser.statusCode != 200) return newUser

    if (newUser?.data?.avatar) {
      await this._storageProvider.save(newUser.data.avatar, `uploads/avatar`)
    }

    return newUser
  }
}
