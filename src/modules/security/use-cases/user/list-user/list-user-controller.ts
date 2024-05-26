import { Request, Response } from "express"

import { container } from "tsyringe"

import { ListUserUseCase } from "@modules/security/use-cases/user/list-user/list-user-use-case"

import { IParams } from "@interfaces/shared"

export class ListUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { search, page, pageSize } = request.query as IParams

    const result = await container.resolve(ListUserUseCase).execute({
      search: search as string,
      page: Number(page || 0),
      pageSize: Number(pageSize || 50),
      params: request.query as IParams,
    })

    return response.status(result.statusCode).json(result)
  }
}
