import {
  IStorageControllers,
  IStorage,
  IStorageProvider,
} from "@shared/container/providers/storage-provider/i-storage-provider"

import { LocalStorageProvider } from "@shared/container/providers/storage-provider/implementations/local-storage-provider"

const storageProviders: IStorageControllers = {
  local: new LocalStorageProvider(),
}
const storage: IStorage = (process.env.STORAGE || "local") as IStorage

export const storageProvider = storageProviders[storage] as IStorageProvider
