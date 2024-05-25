export interface ISendEmail {
  to: string
  subject: string
  variables: IVariables
  template: ITemplate
  attachments?: any[]
}

export interface IMailProvider {
  sendMail(data: ISendEmail): Promise<void>
}

type IVariables = { [key: string]: string | number | boolean | IVariables }
type ITemplate = "auth-confirm-email"
  | "auth-reset-password"
  | "auth-reset-password-success"
