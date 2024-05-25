import { HttpResponse, ok } from "@shared/helpers"

import {
  excelBreakFile,
  excelGetListExcel,
  excelRemoveExcelFile,
} from "@shared/utils/excel"

export class BreakLocalDataController {
  handle = async (): Promise<HttpResponse> => {
    try {
      const list = excelGetListExcel()
      if (list.length == 0) return

      console.log(`BreakLocalDataController: Iniciando processamento do excel ${list[0]}`)

      await excelBreakFile(list[0])

      console.log(`BreakLocalDataController: Exclusão do excel ${list[0]}`)
      excelRemoveExcelFile(list[0])

      console.log(`BreakLocalDataController: Processamento do excel ${list[0]} concluido`)
    } catch (error) {
      console.log("BreakLocalDataController error")
      console.log(error)
    }

    return ok({})
  }
}
