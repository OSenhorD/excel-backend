import { getMessagesPTBR } from "@shared/utils/language/pt-br"

type Lang = "pt-br"

export const getMessages = (lang: Lang = "pt-br"): IMessage => {
  const messages = {
    "pt-br": getMessagesPTBR,
  }

  return messages[lang] ? messages[lang]() : getMessagesPTBR()
}

export interface IMessage {
  generic: {
    not_found: string
  }
  auth: {
    error: string
    forbidden: string
    token_invalid: string
  }
  query: {
    error: string
    error_unique: string
  }
  emails: {
    not_found: string
    update_password: {
      subject: string
    }
    recovery: {
      subject: string
    }
  }
  user: {
    not_found: string
  }
}
