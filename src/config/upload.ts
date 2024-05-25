import { randomBytes } from "crypto"
import * as multer from "multer"
import { resolve } from "path"
import { existsSync, mkdirSync } from "fs"

export const tmpFolder = resolve(__dirname, "..", "..", "tmp")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(tmpFolder)) mkdirSync(tmpFolder)
    cb(null, tmpFolder)
  },
  filename: (req, file, cb) => {
    const fileHash = randomBytes(16).toString("hex")
    const fileName = `${fileHash}-${file.originalname}`
    cb(null, fileName)
  }
})

const limits = {
  files: 1,
  fileSize: 1048576, // 1mb
  fieldSize: 1048576,
  fieldNameSize: 100,
}

const allowedMmimetypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
]

const fileFilter = (_: any, { mimetype }: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  cb(null, allowedMmimetypes.includes(mimetype))
}

export const upload = multer({ storage, limits, fileFilter })

export const uploadMultipleFiles = (files: number = 2, filter = fileFilter) => {
  return multer({ storage, limits: { ...limits, files }, fileFilter: filter })
}
