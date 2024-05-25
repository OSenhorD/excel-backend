import { Router } from "express"

import { databaseDataRoutes } from "@shared/infra/http/routes/database/data-routes"

const databaseRoutes = Router()

databaseRoutes.use("/data", databaseDataRoutes)

export { databaseRoutes }
