import { NotFoundError, ServerError } from "@errors/http"
import { KeyUniqueError, QueryFailedError } from "@errors/http_orm"

export type HttpResponse<T = any, R = Error> = {
  statusCode: number
  data: T
  error?: R
  customCode?: string
}

export type HttpResponseList<T = any[], R = Error> = {
  statusCode: number
  items: T
  count: number
  error?: R
  customCode?: string
}

export const ok = <T = any>(data?: T, customCode?: string): HttpResponse<T> => ({
  statusCode: 200,
  data,
  customCode,
})

export const okList = <T = any[]>(items: T, count?: number, customCode?: string): HttpResponseList<T> => ({
  statusCode: 200,
  items,
  count: count || 0,
  customCode,
})

export const noContent = <T = any>(customCode?: string): HttpResponse<T> => ({
  statusCode: 204,
  data: null,
  customCode,
})

export const notFound = <T = any>(search?: string, customCode?: string): HttpResponse<T, Error> => ({
  statusCode: 404,
  data: null,
  error: new NotFoundError(search).error(),
  customCode,
})

export const serverError = (error: Error, message?: string, customCode?: string): HttpResponse => {
  console.log("serverError")
  console.log(message)
  console.log(error)

  return {
    statusCode: 500,
    data: null,
    error: _typeErrors(error),
    customCode,
  }
}

export const serverErrorList = (error: Error | QueryFailedError, message?: string, customCode?: string): HttpResponseList => {
  console.log("serverErrorList")
  console.log(message)
  console.log(error)

  return {
    statusCode: 500,
    items: [],
    error: _typeErrors(error),
    count: 0,
    customCode,
  }
}

const _typeErrors = (error: any) => {
  switch (error?.routine) {
    case "errorMissingColumn":
      return new KeyUniqueError(error).error()
    case "_bt_check_unique":
      return new QueryFailedError(error).error()
    default:
      return new ServerError(error).error()
  }
}
