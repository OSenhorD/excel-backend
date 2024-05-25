import { container } from "tsyringe"

import { ProcessDataUseCase } from "@modules/database/use-cases/data/process-data/process-data-use-case"

import { HttpResponse } from "@shared/helpers"

export class ProcessLocalDataController {
  handle = async (): Promise<HttpResponse> => {
    const result = await container.resolve(ProcessDataUseCase).execute()
    return result
  }
}
