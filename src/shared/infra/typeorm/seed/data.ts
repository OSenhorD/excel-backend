import { startConnection } from "@shared/infra/typeorm"

const truncate = async () => {
  const connection = await startConnection()

  await connection.query(`TRUNCATE users CASCADE`)
}

const security = async () => {
  const connection = await startConnection()

  await connection.query(
    `
      INSERT INTO users (
        id, is_admin, password, "name", "email"
      ) VALUES
        ('d476819f-04fe-4a12-9b2c-a9c218811aa8', false, '$2b$08$8.Wjm77BuJ0mB9sICrpM8Ox2wcGcuBEuR5FmGq08e/b2gB0EL7/2e', 'David Marques', 'davidmarques.261299@gmail.com'),
        ('5371bc30-c16d-446b-b1b8-fa80c772f01c', true, '$2b$08$8.Wjm77BuJ0mB9sICrpM8Ox2wcGcuBEuR5FmGq08e/b2gB0EL7/2e', 'Isis', 'isis@gmail.com')
    `
  ).then(() => console.log("users ok"))
}

export const seedData = async () => {
  await truncate()

  console.log("Seed Security - Start")
  await security().then(() => console.log("Seed Security - OK\n"))
}
