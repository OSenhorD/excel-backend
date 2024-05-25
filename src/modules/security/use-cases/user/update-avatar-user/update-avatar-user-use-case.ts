import { inject, injectable } from "tsyringe"

import { IUserUpdateAvatarRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

import configImage from "@config/image"

import { IUser } from "@interfaces/shared"

@injectable()
export class UpdateAvatarUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (id: string, avatar: string, user: IUser): Promise<HttpResponse<IUserUpdateAvatarRes>> => {
    const oldUser = await this._userRepository.get(id, user)
    if (oldUser.statusCode != 200) return oldUser

    const newUser = await this._userRepository.updateAvatar(id, avatar, user)
    if (newUser.statusCode != 200) return newUser

    if (oldUser.data.avatar && newUser.data.avatar != oldUser.data.avatar) {
      await this._storageProvider.delete(oldUser.data.avatar, `uploads/avatar`)
    }

    if (newUser.data.avatar) {
      await this._storageProvider.save(newUser.data.avatar, `uploads/avatar`)
    }

    newUser.data.avatar = newUser.data?.avatar ? `${this._storageProvider.url}/uploads/avatar/${newUser.data.avatar}` : configImage.noImageAvatar

    return newUser
  }
}
