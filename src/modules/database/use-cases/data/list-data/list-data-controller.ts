import { Request, Response } from "express"

import { container } from "tsyringe"

import { ListDataUseCase } from "@modules/database/use-cases/data/list-data/list-data-use-case"

import { IParams } from "@interfaces/shared"

export class ListDataController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { search, page, pageSize } = request.query as IParams

    const result = await container.resolve(ListDataUseCase).execute({
      search: search as string,
      page: Number(page || 0),
      pageSize: Number(pageSize || 50),
      params: request.query as IParams,
    }, request.user)

    return response.status(result.statusCode).json(result)
  }
}
