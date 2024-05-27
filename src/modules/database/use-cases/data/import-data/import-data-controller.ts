import { Request, Response } from "express"

import { container } from "tsyringe"

import { ImportDataUseCase } from "@modules/database/use-cases/data/import-data/import-data-use-case"

export class ImportDataController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const result = await container.resolve(ImportDataUseCase).execute(request?.file?.filename || null)

    return response.status(result.statusCode).json(result)
  }
}
