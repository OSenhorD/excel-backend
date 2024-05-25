import { Request, Response } from "express"

import { container } from "tsyringe"

import { DistinctDataUseCase } from "@modules/database/use-cases/data/distinct-data/distinct-data-use-case"

export class DistinctDataController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const column = request.params.column || ""
    const result = await container.resolve(DistinctDataUseCase).execute(column)

    return response.status(result.statusCode).json(result)
  }
}
