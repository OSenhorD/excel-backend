import { Router } from "express"

import { ListDataController } from "@modules/database/use-cases/data/list-data/list-data-controller"
import { ExportDataController } from "@modules/database/use-cases/data/export-data/export-data-controller"

const databaseDataRoutes = Router()

databaseDataRoutes.get("/", new ListDataController().handle)
databaseDataRoutes.post("/export", new ExportDataController().handle)

export { databaseDataRoutes }
