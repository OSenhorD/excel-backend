import { static as eStatic } from "express"

import { app } from "@shared/infra/http/app"

import { tmpFolder } from "@config/upload"

import { router } from "@shared/infra/http/routes"

import { ensureParams } from "@shared/infra/http/middlewares/ensure-params"

app.use(eStatic("public"))
app.use("/uploads", eStatic(`${tmpFolder}/uploads`))

if (process.env.DEBUG) {
  app.use((request, response, next) => {
    console.log("app-routes.ts url")
    console.log(`${request.baseUrl}${request.url}`)
    console.log(request.method)
    console.log(request.baseUrl)
    console.log(request.url)
    next()
  })
}

app.use("/api/v1", [ensureParams], router)
