import { Router } from "express"

import { authsRoutes } from "@shared/infra/http/routes/authentications"
import { securityRoutes } from "@shared/infra/http/routes/security"
import { databaseRoutes } from "@shared/infra/http/routes/database"

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"

const router = Router()

router.use("/auths", authsRoutes)
router.use("/security", [ensureAuthenticated], securityRoutes)
router.use("/database", [ensureAuthenticated], databaseRoutes)

export { router }
