import { faker } from '@faker-js/faker'

export function generateNewDepartamentoData(overide = {}) {
  return {
    clienteId: null,
    nome: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDepartamentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    nome: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDepartamentosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateDepartamentoData(overide)
    }
  )
}
