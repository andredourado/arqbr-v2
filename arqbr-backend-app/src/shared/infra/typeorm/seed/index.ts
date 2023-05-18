import { admin } from "./admin"
import { paises } from "./paises"
import { estados } from "./estados"
import { cidades } from "./cidades"
import { ceps } from "./ceps"
import { campos } from "./campo"

async function seeder() {
  await admin()
  await paises()
  await estados()
  await cidades()
  await ceps()
  await campos()
}

seeder()
