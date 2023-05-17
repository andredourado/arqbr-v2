import { faker } from '@faker-js/faker'

export function generateNewSolicitanteData(overide = {}) {
  return {
    clienteId: null,
    departamentoId: null,
    nome: faker.datatype.string(60),
    email: faker.datatype.string(100),
    telefonesFixos: faker.datatype.string(100),
    celular: faker.datatype.string(20),
    gerenteDepartamento: false,
    gestorContrato: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSolicitanteData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    departamentoId: null,
    nome: faker.datatype.string(60),
    email: faker.datatype.string(100),
    telefonesFixos: faker.datatype.string(100),
    celular: faker.datatype.string(20),
    gerenteDepartamento: false,
    gestorContrato: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSolicitantesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateSolicitanteData(overide)
    }
  )
}
