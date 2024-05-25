import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
import * as timezone from "dayjs/plugin/timezone"

import { IDateProvider, UnitTypeLong } from "@shared/container/providers/date-provider/i-date-provider"

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault(process.env.TZ || "America/Sao_Paulo")

export class DayjsDateProvider implements IDateProvider {
  now = () => dayjs().toDate()

  date = () => this.format(this.now(), "YYYY-MM-DD")
  time = () => this.format(this.now(), "HH:mm:ss")

  /**
   * @param hours 1
   * @param date 2024-03-26T16:30:21.469Z
   * @returns 2024-03-26T16:30:35.469Z
   */
  addMinutes = (minutes: number, date: Date = this.now()) => dayjs(date).add(minutes, "minutes").toDate()
  addHours = (hours: number, date: Date = this.now()) => dayjs(date).add(hours, "hours").toDate()
  addDays = (days: number, date: Date = this.now()) => dayjs(date).add(days, "days").toDate()
  addMonths = (months: number, date: Date = this.now()) => dayjs(date).add(months, "months").toDate()

  format = (date: string | Date, format: string = "YYYY-MM-DD HH:mm:ss") => dayjs(date).format(format)

  isSame = (start: Date, end: Date, tipe?: UnitTypeLong) => dayjs(start).isSame(dayjs(end), tipe)
  isAfter = (start: Date, end: Date, tipe?: UnitTypeLong) => dayjs(start).isAfter(dayjs(end), tipe)
  isBefore = (start: Date, end: Date, tipe: UnitTypeLong) => dayjs(start).isBefore(dayjs(end), tipe)

  toDate = (date: string) => dayjs(date).toDate()
  toISO = (date: string | Date) => dayjs(date).toISOString()
  toUTC = (date: string | Date) => dayjs(date).utc().toDate()
  toUTCLocal = (date: string | Date) => dayjs(date).utc().local().toDate()

  fromOffset = (date: string | Date) => dayjs.tz(date, "UTC").toDate()
  fromOffsetLocal = (date: string | Date) => dayjs.tz(date, "UTC").local().toDate()

  compare = (start: Date, end: Date) => dayjs(start).diff(end)
  compareInYears = (startDate: Date, endDate: Date) => dayjs(endDate).diff(startDate, "years")
  compareInMonths = (startDate: Date, endDate: Date) => dayjs(endDate).diff(startDate, "months")
  compareInDays = (startDate: Date, endDate: Date) => dayjs(endDate).diff(startDate, "days")
  compareInHours = (startDate: Date, endDate: Date) => dayjs(endDate).diff(startDate, "hours")
  compareInMinutes = (startDate: Date, endDate: Date) => dayjs(endDate).diff(startDate, "minutes")

  sortDates = (items: ({ date: string } & any)[], reverse?: boolean) => {
    return items.sort((a, b) => {
      const time_a = new Date(a.date).valueOf()
      const time_b = new Date(b.date).valueOf()
      return reverse
        ? (time_a > time_b ? -1 : (time_a < time_b ? 1 : 0))
        : (time_a > time_b ? 1 : (time_a < time_b ? -1 : 0))
    })
  }
}
