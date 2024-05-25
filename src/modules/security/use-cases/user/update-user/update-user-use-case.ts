import { inject, injectable } from "tsyringe"

import { IUserUpdateParam, IUserUpdateRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

import { IUser } from "@interfaces/shared"

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (id: string, body: IUserUpdateParam, user: IUser): Promise<HttpResponse<IUserUpdateRes>> => {
    const oldUser = await this._userRepository.get(id, user)
    if (oldUser.statusCode != 200) return oldUser

    if (body?.avatar && body.avatar.startsWith(`${this._storageProvider.url}/`)) {
      body.avatar = undefined
    }

    const newUser = await this._userRepository.update(id, {
      name: body?.name,
      email: body?.email,
      password: body?.password,
      avatar: body?.avatar,
      isAdmin: body?.isAdmin,
      isActive: body?.isActive,
    }, user)
    if (newUser.statusCode != 200) return newUser

    if (oldUser.data.avatar && body.avatar !== undefined && newUser.data.avatar != oldUser.data.avatar) {
      await this._storageProvider.delete(oldUser.data.avatar, `uploads/avatar`)
    }

    if (newUser.data.avatar) {
      await this._storageProvider.save(newUser.data.avatar, `uploads/avatar`)
    }

    return newUser
  }
}
