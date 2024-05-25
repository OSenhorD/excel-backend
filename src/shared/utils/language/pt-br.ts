import { IMessage } from "@shared/utils/language"

const messages: IMessage = {
  generic: {
    not_found: "O registro {1} não foi encontrado!",
  },
  auth: {
    error: "Erro de autenticação",
    forbidden: "Não autorizado",
    token_invalid: "Token inválido",
  },
  query: {
    error: "Erro ao realziar consulta: {1}",
    error_unique: "Erro de valores únicos: {1}",
  },
  emails: {
    not_found: "O e-mail informado não foi encontrado!",
    update_password: {
      subject: "Alteração de Senha",
    },
    recovery: {
      subject: "Recuperação de Senha",
    },
  },
  user: {
    not_found: "Usuário não encontrado!",
  },
}

export const getMessagesPTBR = (): IMessage => JSON.parse(JSON.stringify(messages))
