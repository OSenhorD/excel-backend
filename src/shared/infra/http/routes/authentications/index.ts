import { Router } from "express"

import { loginRoutes } from "@shared/infra/http/routes/authentications/login-routes"
import { recoveryRoutes } from "@shared/infra/http/routes/authentications/recovery-routes"

const authsRoutes = Router()

authsRoutes.use("/login", loginRoutes)
authsRoutes.use("/recovery", recoveryRoutes)

export { authsRoutes }
