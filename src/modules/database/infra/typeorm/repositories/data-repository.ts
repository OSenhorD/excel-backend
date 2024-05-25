import { Repository } from "typeorm"

import { Data } from "@modules/database/infra/typeorm/entities/data"

import { IDataDTO, IDataListRes } from "@modules/database/dtos/i-data-dto"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import AppDataSource from "@shared/infra/typeorm"

import {
  ok,
  okList,
  serverErrorList,
  HttpResponseList,
  HttpResponse,
  serverError,
} from "@shared/helpers"

import { ISearch } from "@interfaces/shared"

export class DataRepository implements IDataRepository {
  private readonly _repository: Repository<Data> = AppDataSource.getRepository(Data)

  list = async ({ page, pageSize, params }: ISearch): Promise<HttpResponseList<IDataListRes[]>> => {
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

  process = async (items: Omit<IDataDTO, "id">[]): Promise<HttpResponse<{ ok: number, error: number, total: number }>> => {
    const result = { ok: 0, error: 0, total: items.length }

    try {
      await AppDataSource.transaction(async trx => {
        const _repositoryData = trx.getRepository(Data)

        for await (const item of items) {
          const newItem = _repositoryData.create({
            CODCOLIGADA: item?.CODCOLIGADA || null,
            FILIAL_NOME: item?.FILIAL_NOME || null,
            ANOCOMP: item?.ANOCOMP || null,
            MESCOMP: item?.MESCOMP || null,
            CHAPA: item?.CHAPA || null,
            NOME: item?.NOME || null,
            CODCCUSTO: item?.CODCCUSTO || null,
            COLIGADA_NOME: item?.COLIGADA_NOME || null,
            CCUSTO: item?.CCUSTO || null,
            SITUACAO_NOME: item?.SITUACAO_NOME || null,
            DATAADMISSAO: item?.DATAADMISSAO || null,
            DATADEMISSAO: item?.DATADEMISSAO || null,
            EVENTO: item?.EVENTO || null,
            CODCONTADEBITO: item?.CODCONTADEBITO || null,
            DEBITO: item?.DEBITO || null,
            CLASSIF_FUNCIONARIO: item?.CLASSIF_FUNCIONARIO || null,
            VALOR: item?.VALOR || null,
          })
          const newItemSave = await _repositoryData.save(newItem)
          newItemSave.id ? result.ok++ : result.error++
        }
      })

      return ok(result)
    } catch (error) {
      return serverError(error, "DataRepository process")
    }
  }
}
