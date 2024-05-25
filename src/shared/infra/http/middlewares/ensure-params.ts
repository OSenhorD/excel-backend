import {
  NextFunction,
  Request,
  Response,
} from "express"

export const ensureParams = async (request: Request, response: Response, next: NextFunction) => {
  const query = (request.query || {}) as any

  Object.keys(query).forEach(key => {
    switch (request.query[key]) {
      case "null":
        request.query[key] = null
        break;
      case "undefined":
        request.query[key] = undefined
        break;
      case "false":
        request.query[key] = false as any
        break;
      case "true":
        request.query[key] = true as any
        break;
      default:
        break;
    }
  })

  return next()
}
