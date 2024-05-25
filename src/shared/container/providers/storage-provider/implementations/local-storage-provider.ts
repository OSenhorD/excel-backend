import {
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
  unlinkSync,
} from "fs"

import { resolve } from "path"

import { tmpFolder } from "@config/upload"

import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider"

export class LocalStorageProvider implements IStorageProvider {
  get url(): string {
    return process.env.APP_API_URL
  }

  save = async (file: string, folder: string, newFileName?: string): Promise<string> => {
    await this._createDir(`${tmpFolder}/${folder}`)

    renameSync(
      resolve(tmpFolder, file),
      resolve(`${tmpFolder}/${folder}`, newFileName || file)
    )

    return file
  }

  delete = async (file: string, folder: string): Promise<void> => {
    const filename = resolve(`${tmpFolder}/${folder}`, file)

    try {
      statSync(filename)
      unlinkSync(filename)
    } catch (error) {
      console.log("LocalStorageProvider delete")
      console.log(error)
    }
  }

  private _createDir = async (directory: string) => {
    let dir = directory.split("/")
    let dirEnd = dir.shift() ?? ""
    dirEnd += `/${dir.shift()}`

    while (dir.length > 0) {
      dirEnd += `/${dir.shift()}`
      if (!existsSync(dirEnd)) mkdirSync(dirEnd)
    }
  }
}
