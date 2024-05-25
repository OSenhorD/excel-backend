import { getMessages } from "@shared/utils/language"

export class NotFoundError extends Error {
  constructor(filter?: string) {
    super("Not found")
    this.name = "NotFoundError"
    this.message = getMessages().generic.not_found.replace("{1}", filter || "")
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}

export class ServerError extends Error {
  constructor(error: Error) {
    super("Server")
    this.name = "ServerError"
    this.message = error?.message || error as any
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}
