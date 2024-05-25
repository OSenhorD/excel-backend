export enum Storage {
  local = "local",
}
export type IStorage = keyof typeof Storage

export interface IStorageControllers {
  local: IStorageProvider
}

export interface IStorageProvider {
  readonly url: string

  save(file: string, folder: string, newFileName?: string): Promise<string>
  delete(file: string, folder: string): Promise<void>
}
