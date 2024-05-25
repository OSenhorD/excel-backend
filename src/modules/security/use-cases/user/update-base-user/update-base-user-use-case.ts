import { inject, injectable } from "tsyringe"

import { IUserUpdateBaseRes } from "@modules/security/dtos/i-user-dto"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"

import { HttpResponse } from "@shared/helpers"

import { IUser } from "@interfaces/shared"

@injectable()
export class UpdateBaseUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }

  execute = async (id: string, name: string, email: string, user:IUser): Promise<HttpResponse<IUserUpdateBaseRes>> => {
    const result = await this.userRepository.updateBase(id, name, email, user)
    if (result.statusCode != 200) return result

    return result
  }
}
