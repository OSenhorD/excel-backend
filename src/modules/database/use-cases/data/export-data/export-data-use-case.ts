import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { HttpResponse, ok } from "@shared/helpers"
import { exportExcelSheets } from "@shared/utils/excel"

import { ISearch } from "@interfaces/shared"

@injectable()
export class ExportDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
  ) { }

  execute = async (page: ISearch): Promise<HttpResponse> => {
    const dataItems = await this._dataRepository.list({
      search: page?.search,
      page: page?.page,
      pageSize: page?.pageSize,
      params: {
        ...page?.params,
        noPagination: true,
      },
    })
    if (dataItems.statusCode != 200) return ok({})

    const excel = await exportExcelSheets({
      sheetName: "",
      cols: [
        "CODCOLIGADA",
        "FILIAL_NOME",
        "ANOCOMP",
        "MESCOMP",
        "CHAPA",
        "NOME",
        "CODCCUSTO",
        "COLIGADA_NOME",
        "CCUSTO",
        "SITUACAO_NOME",
        "DATAADMISSAO",
        "DATADEMISSAO",
        "EVENTO",
        "CODCONTADEBITO",
        "DEBITO",
        "CLASSIF_FUNCIONARIO",
        "VALOR",
      ],
      data: dataItems.items,
    })

    return ok(excel)
  }
}
