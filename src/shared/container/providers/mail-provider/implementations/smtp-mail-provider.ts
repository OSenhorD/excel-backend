import { injectable } from "tsyringe"
import { createTransport, Transporter } from "nodemailer"
import { Attachment } from "nodemailer/lib/mailer"
import { compile } from "handlebars"
import { readFileSync } from "fs"

import { IMailProvider, ISendEmail } from "@shared/container/providers/mail-provider/i-mail-provider"

interface ISMTPSendEmail extends Omit<ISendEmail, "attachments"> {
  attachments?: Attachment[]
}

@injectable()
export class SmtpMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.log("Parâmetros para envio de e-mail não preenchidos")
      return
      // throw new Error("Parâmetros para envio de e-mail não preenchidos")
    }

    this.client = createTransport({
      service: "gmail",
      host: String(SMTP_HOST),
      port: Number(SMTP_PORT),
      secure: true,
      auth: {
        user: String(SMTP_USER),
        pass: String(SMTP_PASS),
      },
    })
  }

  sendMail = async ({ to, subject, variables, template, attachments }: ISMTPSendEmail): Promise<void> => {
    const pathBase = `public/views/${template}.hbs`
    const templateFileContent = readFileSync(pathBase, "utf-8").toString().replace(/(\r)/gm, "\n")
    const templateParse = compile(templateFileContent)
    const html = templateParse(variables)

    if (process.env.DEBUG != "false") {
      to = process.env.EMAIL_DEBUG || process.env.SMTP_USER || "davidmarques.261299@gmail.com"
    }

    try {
      await this.client.sendMail({
        to,
        subject,
        from: {
          name: String(process.env.SMTP_NAME || ""),
          address: String(process.env.SMTP_USER),
        },
        html,
        attachments,
      })

      console.info(`[${new Date().toISOString()}] Email sent to ${to}`)
    } catch (error) {
      console.error(`sendMail - [${new Date().toISOString()}] Error email sent to ${to} `)
      console.error(error)
    }
  }
}
