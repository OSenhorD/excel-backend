import * as XLSX from "node-xlsx"

import { tmpFolder } from "@config/upload"

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs"

export const excelBreakFile = async (filename: string) => {
  try {
    console.log(`excelBreakFile: Iniciando processo de quebra de arquivo`)
    if (!existsSync(`${tmpFolder}/uploads/csv`)) mkdirSync(`${tmpFolder}/uploads/csv`)

    const workBook = XLSX.parse(`${tmpFolder}/uploads/import/${filename}`, { cellDates: true })

    const colsDate = {
      "DATAADMISSAO": -1,
      "DATADEMISSAO": -1,
    }
    for await (const work of workBook) {
      const cols = work.data.splice(0, 1)[0].map(col => col.trim())
      Object.keys(colsDate).forEach(key => colsDate[key] = cols.findIndex(c => c == key))

      let idx = 0
      while (work.data.length > 0) {
        if (idx % 50 == 0) {
          console.log(`excelBreakFile: Processando quebra de arquivo ${idx}/${work.data.length}`)
        }

        idx++
        const content = work.data.splice(0, 40)
        const text = `${cols.join(";")}\n` + `${content.map(ctt => {
          return ctt.map((e, idxV) => {
            const key = Object.keys(colsDate).find(key => colsDate[key] == idxV)
            return key && colsDate[key] >= 0 ? e.toISOString().split("T")[0] : e
          }).join(";")
        }).join("\n")}`
        writeFileSync(`${tmpFolder}/uploads/csv/${idx}-${filename}.csv`, text)
      }
    }

    console.log(`excelBreakFile: Processo de quebra de arquivo finalizado!`)
  } catch (error) {
    console.log("excelBreakFile error")
    console.log(error)
  }
}

export const excelGetListCsv = () => {
  return readdirSync(`${tmpFolder}/uploads/csv`)
}

export const excelGetitems = (file: string) => {
  try {
    const data = readFileSync(`${tmpFolder}/uploads/csv/${file}`).toString("utf-8").split("\n")
    const cols = data.splice(0, 1)[0].split(";")

    const items = data.map(item => {
      const obj: any = {}
      item.split(";").forEach((value, idx) => {
        obj[cols[idx]] = value
      })
      return obj
    })

    return items
  } catch (error) {
    console.log("excelGetitems error")
    console.log(error)
    return []
  }
}

export const excelRemoveFile = (file: string) => {
  return rmSync(`${tmpFolder}/uploads/csv/${file}`)
}