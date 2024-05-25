import * as cron from "node-cron"

import { ProcessLocalDataController } from "@modules/database/use-cases/data/process-data/process-local-data-controller"

export const start = () => {
  cron.schedule("* * * * *", async () => {
    console.log("[cron]: Excel - Processando arquivos da importação!")
    await new ProcessLocalDataController().handle()

    await new ProcessLocalDataController().handle()

    await new ProcessLocalDataController().handle()
  })
}