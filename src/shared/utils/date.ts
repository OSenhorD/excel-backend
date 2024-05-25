import {
  IDate,
  IDateControllers,
  IDateProvider,
} from "@shared/container/providers/date-provider/i-date-provider"

import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/day-js-date-provider"

const dateProviders: IDateControllers = {
  dayjs: new DayjsDateProvider(),
}
const date: IDate = (process.env.DATE_PROVIDER || "dayjs") as IDate

export const dateProvider = dateProviders[date] as IDateProvider
