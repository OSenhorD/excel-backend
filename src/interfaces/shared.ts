export type IParams = { [key: string]: string | number | boolean }

export interface ISearch {
  search?: string
  page: number
  pageSize: number
  params?: IParams
}

export interface IUser {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isActive: boolean
}
