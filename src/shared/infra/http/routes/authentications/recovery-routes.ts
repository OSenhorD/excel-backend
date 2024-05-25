import { Router } from "express"

import { RecoverySendController } from "@modules/security/use-cases/user/recovery-send-user/recovery-send-user-controller"
import { RecoveryIsValidTokenController } from "@modules/security/use-cases/user/recovery-is-valid-token-user/recovery-is-valid-token-user-controller"
import { RecoveryNewPasswordUserController } from "@modules/security/use-cases/user/recovery-new-password-user/recovery-new-password-user-controller"

const recoveryRoutes = Router()

recoveryRoutes.post("/is-valid-token", new RecoveryIsValidTokenController().handle)
recoveryRoutes.post("/new-password", new RecoveryNewPasswordUserController().handle)
recoveryRoutes.post("/", new RecoverySendController().handle)

export { recoveryRoutes }
