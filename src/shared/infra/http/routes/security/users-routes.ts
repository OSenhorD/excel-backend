import { Router } from "express"

import { UpdateAvatarUserController } from "@modules/security/use-cases/user/update-avatar-user/update-avatar-user-controller"
import { UpdateBaseUserController } from "@modules/security/use-cases/user/update-base-user/update-base-user-controller"
import { UpdatePasswordUserController } from "@modules/security/use-cases/user/update-password-user/update-password-user-controller"

import { GetUserController } from "@modules/security/use-cases/user/get-user/get-user-controller"
import { ListUserController } from "@modules/security/use-cases/user/list-user/list-user-controller"
import { CreateUserController } from "@modules/security/use-cases/user/create-user/create-user-controller"
import { UpdateUserController } from "@modules/security/use-cases/user/update-user/update-user-controller"
import { DeleteUserController } from "@modules/security/use-cases/user/delete-user/delete-user-controller"

import { upload } from "@config/upload"

const securityUsersRoutes = Router()

securityUsersRoutes.get("/:id", new GetUserController().handle)
securityUsersRoutes.get("/", new ListUserController().handle)
securityUsersRoutes.post("/", upload.single("avatar"), new CreateUserController().handle)
securityUsersRoutes.put("/avatar/:id", upload.single("avatar"), new UpdateAvatarUserController().handle)
securityUsersRoutes.put("/base/:id", new UpdateBaseUserController().handle)
securityUsersRoutes.put("/password/:id", new UpdatePasswordUserController().handle)
securityUsersRoutes.put("/:id", upload.single("avatar"), new UpdateUserController().handle)
securityUsersRoutes.delete("/:id", new DeleteUserController().handle)

export { securityUsersRoutes }
