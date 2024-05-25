import { container } from "tsyringe"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"
import { LocalStorageProvider } from "@shared/container/providers/storage-provider/implementations/local-storage-provider"

const diskStorage = {
  local: LocalStorageProvider,
}

container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.STORAGE || "local"])
