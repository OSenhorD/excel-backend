import {
  In,
  Not,
  SelectQueryBuilder,
} from "typeorm"

import { IParams } from "@interfaces/shared"

/**
 * Inclui os parâmetros recebidos via url
 *
 * @param query
 * @param validParams
 * @param onlyId
 *
 * @returns
 */
export const insertWhereParams = (query: SelectQueryBuilder<any>, validParams: IParams, onlyId: boolean = true) => {
  if (Object.keys(validParams).length == 0) return query

  // Inclusão do operador IN
  Object.keys(validParams)
    .filter(key => typeof validParams[key] == "string" && `${validParams[key]}`.includes(";"))
    .forEach(key => {
      const values = `${validParams[key]}`.split(";")
      validParams[key] = In(values) as any
    })

  if (onlyId && Object.keys(validParams).includes("id")) {
    query.andWhere({ id: validParams.id })
    return query
  }

  // Inclusão do operador NOTIN
  Object.keys(validParams)
    .filter(key => typeof validParams[key] == "string" && `${validParams[key]}`.startsWith("-") && !`${validParams[key]}`.includes(";"))
    .forEach(key => {
      const values = `${validParams[key]}`.slice(1)
      validParams[key] = Not(values) as any
    })

  // Inclusão do operador NOTIN em um array
  Object.keys(validParams)
    .filter(key => typeof validParams[key] == "string" && `${validParams[key]}`.startsWith("-") && `${validParams[key]}`.includes(";"))
    .forEach(key => {
      const values = `${validParams[key]}`.slice(1).split(";")
      validParams[key] = Not(In(values)) as any
    })

  query.andWhere({
    ...validParams,
  })

  return query
}
