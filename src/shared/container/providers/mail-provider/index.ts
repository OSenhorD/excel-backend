import { container } from "tsyringe"

import { IMailProvider } from "@shared/container/providers/mail-provider/i-mail-provider"
import { SmtpMailProvider } from "@shared/container/providers/mail-provider/implementations/smtp-mail-provider"

const mailProvider = {
  smtp: container.resolve(SmtpMailProvider),
}

container.registerInstance<IMailProvider>("MailProvider", mailProvider[process.env.MAIL_PROVIDER || "smtp"])
