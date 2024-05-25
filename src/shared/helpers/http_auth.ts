import { HttpResponse } from "@shared/helpers/http"

import {
  AuthError,
  BadRequestError,
  ForbiddenError,
  NoTokenError,
} from "@errors/http_auth"

export const badRequest = (error: Error, customCode?: string): HttpResponse => ({
  statusCode: 400,
  data: null,
  error: new BadRequestError(error).error(),
  customCode,
})

export const forbidden = (error?: Error, customCode?: string): HttpResponse => ({
  statusCode: 400,
  data: null,
  error: new ForbiddenError(error).error(),
  customCode,
})

export const noToken = (customCode?: string): HttpResponse => ({
  statusCode: 401,
  data: null,
  error: new NoTokenError().error(),
  customCode,
})

export const authError = (error?: Error, customCode?: string): HttpResponse => ({
  statusCode: 401,
  data: null,
  error: new AuthError(error).error(),
  customCode,
})
