import {
  appendFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "fs"

import { resolve } from "path"

import { dateProvider } from "@shared/utils/date"

export const log = (file: string, message: string) => {
  const tmp = resolve(__dirname, "..", "..", "tmp")
  if (!existsSync(tmp)) mkdirSync(tmp)

  const folder = resolve(tmp, file)
  if (!existsSync(folder)) mkdirSync(folder)

  const dateFolder = dateProvider.date()
  if (!existsSync(`${folder}/${dateFolder}`)) mkdirSync(`${folder}/${dateFolder}`)

  message = `[${dateProvider.now()}] ${message}`

  const hour = dateProvider.time().split(":")[0]
  const filename = `${dateFolder}_${hour}.txt`
  existsSync(`${folder}/${dateFolder}/${filename}`)
    ? appendFileSync(`${folder}/${dateFolder}/${filename}`, `\n${message}`)
    : writeFileSync(`${folder}/${dateFolder}/${filename}`, message)
}
