import { IDataListRes } from "@modules/database/dtos/i-data-dto"

import { HttpResponseList } from "@shared/helpers"

import { ISearch, IUser } from "@interfaces/shared"

export interface IDataRepository {
  list(data: ISearch, user: IUser): Promise<HttpResponseList<IDataListRes[]>>
}
