import { faker } from '@faker-js/faker'

export function generateNewVeiculoData(overide = {}) {
  return {
    descricao: faker.datatype.string(60),
    capacidade: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVeiculoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    descricao: faker.datatype.string(60),
    capacidade: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVeiculosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateVeiculoData(overide)
    }
  )
}
