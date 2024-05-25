import { HttpResponse } from "@shared/helpers/http"

import { KeyUniqueError, QueryFailedError } from "@errors/http_orm"

export const queryFailedError = (error: Error, customCode?: string): HttpResponse<any, Error> => ({
  statusCode: 500,
  data: null,
  error: new QueryFailedError(error).error(),
  customCode,
})

export const keyUniqueError = (error: Error, customCode?: string): HttpResponse<any, Error> => ({
  statusCode: 500,
  data: null,
  error: new KeyUniqueError(error).error(),
  customCode,
})
