import { Request, Response } from "express"

import { ProcessLocalDataController } from "@modules/database/use-cases/data/process-data/process-local-data-controller"

export class ProcessDataController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const result = await new ProcessLocalDataController().handle()
    return response.status(result.statusCode).json(result)
  }
}
