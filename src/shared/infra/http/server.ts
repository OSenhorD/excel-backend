import { app } from "@shared/infra/http/app"
import "@shared/infra/http/app-routes"
import "@shared/infra/http/app-errors"

import { startConnection } from "@shared/infra/typeorm"

const port = Number(process.env.PORT || 3333)
startConnection()
  .then(() => {
    app.listen(port, () => console.log(`Server is running in port ${port}!`))
  })
  .catch(err => {
    console.log(`Erro ao iniciar o servidor na porta ${port}`)
    console.log(err)
  })
