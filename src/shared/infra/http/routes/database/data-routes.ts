import { Router } from "express"

import { ListDataController } from "@modules/database/use-cases/data/list-data/list-data-controller"
import { ExportDataController } from "@modules/database/use-cases/data/export-data/export-data-controller"
import { ImportDataController } from "@modules/database/use-cases/data/import-data/import-data-controller"
import { ProcessDataController } from "@modules/database/use-cases/data/process-data/process-data-controller"
import { DistinctDataController } from "@modules/database/use-cases/data/distinct-data/distinct-data-controller"

import { ensureAdmin } from "@shared/infra/http/middlewares/ensure-admin"

import { storage } from "@config/upload"

import * as multer from "multer"

const limits = {
  files: 1,
  fileSize: 31457280, // 30mb
  fieldSize: 1048576,
  fieldNameSize: 100,
}

const allowedMimetypes = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]

const fileFilter = (_: any, { mimetype }: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  cb(null, allowedMimetypes.includes(mimetype))
}

const upload = multer({ storage, limits, fileFilter })

const databaseDataRoutes = Router()

databaseDataRoutes.get("/process", [ensureAdmin], new ProcessDataController().handle)
databaseDataRoutes.get("/distinct/:column", new DistinctDataController().handle)
databaseDataRoutes.get("/export", new ExportDataController().handle)
databaseDataRoutes.get("/", new ListDataController().handle)
databaseDataRoutes.post("/import", upload.single("excel"), new ImportDataController().handle)

export { databaseDataRoutes }
