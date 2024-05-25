import { app } from "@shared/infra/http/app"
import "@shared/infra/http/app-routes"
import "@shared/infra/http/app-errors"

const port = Number(process.env.PORT || 3333)
app.listen(port, () => console.log(`Server is running in port ${port}!`))

// TODO: Coluna de ordem para os campos customizados
