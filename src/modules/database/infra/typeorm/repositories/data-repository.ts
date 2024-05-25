import { Repository } from "typeorm"

import { Data } from "@modules/database/infra/typeorm/entities/data"

import { IDataListRes } from "@modules/database/dtos/i-data-dto"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import AppDataSource from "@shared/infra/typeorm"

import {
  ok,
  okList,
  serverErrorList,
  HttpResponseList,
} from "@shared/helpers"

import { ISearch, IUser } from "@interfaces/shared"

export class DataRepository implements IDataRepository {
  private readonly _repository: Repository<Data> = AppDataSource.getRepository(Data)

  list = async ({ page, pageSize, params }: ISearch, user: IUser): Promise<HttpResponseList<IDataListRes[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder("dat")
        .select([
          `dat.id as "id"`,
          `dat.CODCOLIGADA as "CODCOLIGADA"`,
          `dat.FILIAL_NOME as "FILIAL_NOME"`,
          `dat.ANOCOMP as "ANOCOMP"`,
          `dat.MESCOMP as "MESCOMP"`,
          `dat.CHAPA as "CHAPA"`,
          `dat.NOME as "NOME"`,
          `dat.CODCCUSTO as "CODCCUSTO"`,
          `dat.COLIGADA_NOME as "COLIGADA_NOME"`,
          `dat.CCUSTO as "CCUSTO"`,
          `dat.SITUACAO_NOME as "SITUACAO_NOME"`,
          `dat.DATAADMISSAO as "DATAADMISSAO"`,
          `dat.DATADEMISSAO as "DATADEMISSAO"`,
          `dat.EVENTO as "EVENTO"`,
          `dat.CODCONTADEBITO as "CODCONTADEBITO"`,
          `dat.DEBITO as "DEBITO"`,
          `dat.CLASSIF_FUNCIONARIO as "CLASSIF_FUNCIONARIO"`,
          `dat.VALOR as "VALOR"`,
        ])

      const count = await query.getCount()

      query = query
        .addOrderBy("dat.CODCOLIGADA", "ASC")
        .addOrderBy("dat.FILIAL_NOME", "ASC")

      if (!params?.noPagination) {
        query = query
          .offset(pageSize * page)
          .limit(pageSize)
      }

      const items = await query.getRawMany()
      return okList(items, count)
    } catch (error) {
      return serverErrorList(error, "DataRepository list")
    }
  }
}
