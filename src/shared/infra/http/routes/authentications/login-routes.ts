import { Router } from "express"

import { AuthenticateUserController } from "@modules/security/use-cases/user/authenticate-user/authenticate-user-controller"

const loginRoutes = Router()

loginRoutes.post("/", new AuthenticateUserController().handle)

export { loginRoutes }
