import { Router } from "express"
import { securityUsersRoutes } from "@shared/infra/http/routes/security/users-routes"

const securityRoutes = Router()

securityRoutes.use("/users", securityUsersRoutes)

export { securityRoutes }
