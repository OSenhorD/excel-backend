import { IDataDTO, IDataListRes } from "@modules/database/dtos/i-data-dto"

import { HttpResponse, HttpResponseList } from "@shared/helpers"

import { ISearch } from "@interfaces/shared"

export interface IDataRepository {
  list(data: ISearch): Promise<HttpResponseList<IDataListRes[]>>
  distinct(column: string): Promise<HttpResponse<string[]>>
  process(items: Omit<IDataDTO, "id">[]): Promise<HttpResponse<{ ok: number, error: number, total: number }>>
}
