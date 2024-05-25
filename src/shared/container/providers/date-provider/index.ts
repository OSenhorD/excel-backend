import { container } from "tsyringe"

import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider"
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/day-js-date-provider"

const dateProvider = {
  dayjs: DayjsDateProvider,
}

container.registerSingleton<IDateProvider>("DateProvider", dateProvider[process.env.DATE_PROVIDER || "dayjs"])
