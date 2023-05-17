import { faker } from '@faker-js/faker'

export function generateNewTipoAfastamentoData(overide = {}) {
  return {
    descricao: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTipoAfastamentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    descricao: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTiposAfastamentoData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateTipoAfastamentoData(overide)
    }
  )
}
