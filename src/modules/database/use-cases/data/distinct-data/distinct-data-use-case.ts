import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { HttpResponse } from "@shared/helpers"

@injectable()
export class DistinctDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
  ) { }

  execute = async (column: string): Promise<HttpResponse<string[]>> => {
    const items = await this._dataRepository.distinct(column)
    if (items.statusCode != 200) return items

    return items
  }
}
