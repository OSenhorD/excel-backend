export enum DateEnum {
  dayjs = "dayjs",
}
export type IDate = keyof typeof DateEnum

export interface IDateControllers {
  dayjs: IDateProvider
}

export type UnitTypeLong = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'

export interface IDateProvider {
  now(): Date

  date(): string
  time(): string

  addMinutes(minutes: number, date?: Date): Date
  addHours(hours: number, date?: Date): Date
  addDays(hours: number, date?: Date): Date
  addMonths(hours: number, date?: Date): Date

  format(date: string | Date, format?: string): string

  isSame(start: Date, end: Date, tipe?: UnitTypeLong): boolean
  isAfter(start: Date, end: Date, tipe?: UnitTypeLong): boolean
  isBefore(start: Date, end: Date, tipe?: UnitTypeLong): boolean

  toDate(date: string): Date
  toISO(date: string | Date): string
  toUTC(date: string | Date): Date
  toUTCLocal(date: string | Date): Date

  fromOffset(date: string | Date): Date
  fromOffsetLocal(date: string | Date): Date

  sortDates(items: ({ date: string } & any)[], reverse?: boolean): ({ date: string } & any)[]

  compare(startDate: Date, endDate: Date): number
  compareInYears(startDate: Date, endDate: Date): number
  compareInMonths(startDate: Date, endDate: Date): number
  compareInDays(startDate: Date, endDate: Date): number
  compareInHours(startDate: Date, endDate: Date): number
  compareInMinutes(startDate: Date, endDate: Date): number
}
