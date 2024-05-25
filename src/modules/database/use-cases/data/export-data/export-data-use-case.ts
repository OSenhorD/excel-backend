import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { HttpResponse, ok } from "@shared/helpers"

import { ISearch } from "@interfaces/shared"

@injectable()
export class ExportDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
  ) { }

  execute = async (page: ISearch): Promise<HttpResponse> => {
    return ok({})
  }
}
