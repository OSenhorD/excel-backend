import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { HttpResponse, ok } from "@shared/helpers"

import {
  excelGetitems,
  excelGetListCsv,
  excelRemoveFile,
} from "@shared/utils/excel"

@injectable()
export class ProcessDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
  ) { }

  execute = async (): Promise<HttpResponse> => {
    const count = 300
    const files = excelGetListCsv()
    console.log(`ProcessDataUseCase: Iniciando processamento de ${count} arquivos de um total de ${files.length}`)

    for await (const [idx, file] of files.slice(0, count).entries()) {
      console.log(`ProcessDataUseCase: [${idx + 1}/${count}]: Processando`)

      const items = excelGetitems(file)
      excelRemoveFile(file)
      if (items.length == 0) continue


      await this._dataRepository.process(items)
    }

    console.log(`ProcessDataUseCase: Processamento de ${count} arquivos concluido`)
    return ok({})
  }
}
