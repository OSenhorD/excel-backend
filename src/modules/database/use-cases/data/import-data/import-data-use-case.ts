import { inject, injectable } from "tsyringe"

import { IDataRepository } from "@modules/database/repositories/i-data-repository"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

import { HttpResponse, ok } from "@shared/helpers"

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

    this._storageProvider.save(filename, `uploads/import`)

    return ok({})
  }
}
