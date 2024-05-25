import { getMessages } from "@shared/utils/language"

export class BadRequestError extends Error {
  constructor(error: Error) {
    super("BadRequest")
    this.name = "BadRequestError"
    this.message = error?.message
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}

export class ForbiddenError extends Error {
  constructor(error?: Error) {
    super("Forbidden")
    this.name = "ForbiddenError"
    this.message = getMessages().auth.forbidden
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}

export class NoTokenError extends Error {
  constructor() {
    super("NoToken")
    this.name = "NoTokenError"
    this.message = getMessages().auth.token_invalid
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}

export class AuthError extends Error {
  constructor(error?: Error) {
    console.log("AuthError")
    console.log(error)
    super("Auth")
    this.name = "AuthError"
    this.message = getMessages().auth.error
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}
