import { seedData } from "@shared/infra/typeorm/seed/data"

const seeder = async () => {
  await seedData().then(() => console.log("seedData - OK\n"))
}

seeder().then(() => console.log("seeder - OK\n"))
