import "dotenv/config"

import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: (process.env.DATASOURCE_TYPE as any) || "postgres",
  host: process.env.DATASOURCE_HOST || "localhost",
  port: Number(process.env.DATASOURCE_PORT || 5432),
  username: process.env.DATASOURCE_USERNAME,
  password: process.env.DATASOURCE_PASSWORD,
  database: process.env.DATASOURCE_DATABASE,
  applicationName: "excel",
  uuidExtension: "uuid-ossp",
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  entities: [
    "./src/modules/**/entities/*.ts",
    "./dist/modules/**/entities/*.js"
  ],
})

export default AppDataSource

export const startConnection = async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize()

  return AppDataSource
}
