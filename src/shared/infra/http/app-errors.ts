import {
  NextFunction,
  Request,
  Response,
} from "express"

import { app } from "@shared/infra/http/app"

app.use((err: any, request: Request, response: Response, next: NextFunction) => {
  if (process.env.DEBUG) {
    console.log("app-errors.ts", err)
  }

  if (err?.statusCode) {
    return response.status(err.statusCode).json(err)
  }

  return response.status(500).json({
    name: "Internal server error",
    message: err?.message || err,
    stack: null,
  })
})
