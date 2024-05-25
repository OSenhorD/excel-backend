import { IParams } from "@interfaces/shared"

export const isUUID = (str: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str)
}

export const getValidParams = (params: IParams) => {
  const invalid = ["search", "filter", "page", "pageSize", "noPagination"]

  let obj: IParams = {}
  Object
    .keys(params)
    .filter(key => !invalid.includes(key) && (typeof params[key] != "string" || (typeof params[key] == "string" && params[key] != "")))
    .map(key => obj[key] = params[key])

  return obj
}
