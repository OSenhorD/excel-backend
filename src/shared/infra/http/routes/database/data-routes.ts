import { Router } from "express"

import { ListDataController } from "@modules/database/use-cases/data/list-data/list-data-controller"

const databaseDataRoutes = Router()

databaseDataRoutes.get("/", new ListDataController().handle)

export { databaseDataRoutes }
