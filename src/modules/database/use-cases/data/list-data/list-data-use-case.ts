import { inject, injectable } from "tsyringe"

import { IDataListRes } from "@modules/database/dtos/i-data-dto"
import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { HttpResponseList } from "@shared/helpers"

import { ISearch, IUser } from "@interfaces/shared"

@injectable()
export class ListDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
  ) { }

  execute = async (page: ISearch): Promise<HttpResponseList<IDataListRes[]>> => {
    const items = await this._dataRepository.list({
      search: page?.search,
      page: page?.page,
      pageSize: page?.pageSize,
      params: page?.params,
    })
    if (items.statusCode != 200) return items

    return items
  }
}
