import { Request, Response } from "express"

import { container } from "tsyringe"

import { ExportDataUseCase } from "@modules/database/use-cases/data/export-data/export-data-use-case"

import { IParams } from "@interfaces/shared"

export class ExportDataController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { search, page, pageSize } = request.query as IParams

    const result = await container.resolve(ExportDataUseCase).execute({
      search: search as string,
      page: Number(page || 0),
      pageSize: Number(pageSize || 50),
      params: request.query as IParams,
    })

    return response.status(result.statusCode).json(result)
  }
}
