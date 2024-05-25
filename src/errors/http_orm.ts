import { getMessages } from "@shared/utils/language"

export class QueryFailedError extends Error {
  constructor(error?: Error) {
    super("Query Failed")
    this.name = "QueryFailedError"
    this.message = getMessages().query.error.replace("{1}", error?.message)
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}

export class KeyUniqueError extends Error {
  constructor(error?: Error) {
    super("Key Unique")
    this.name = "KeyUniqueError"
    this.message = getMessages().query.error_unique.replace("{1}", (error as any)?.detail.split(" (")[1].split(")=")[0])
    this.stack = ""
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  })
}
