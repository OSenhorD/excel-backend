import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

import { HttpResponse, ok } from "@shared/helpers"

import { excelBreakFile } from "@shared/utils/excel"

@injectable()
export class ImportDataUseCase {
  constructor(
    @inject("DataRepository")
    private readonly _dataRepository: IDataRepository,
    @inject("StorageProvider")
    private readonly _storageProvider: IStorageProvider,
  ) { }

  execute = async (filename: string): Promise<HttpResponse> => {
    if (!filename) return ok({})

    await this._storageProvider.save(filename, `uploads/import`)

    excelBreakFile(filename)

    return ok({})
  }
}
