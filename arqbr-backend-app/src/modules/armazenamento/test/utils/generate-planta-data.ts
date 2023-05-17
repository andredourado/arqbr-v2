import { faker } from '@faker-js/faker'

export function generateNewPlantaData(overide = {}) {
  return {
    unidadeId: null,
    nome: faker.datatype.string(60),
    quantidadePosicoes: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePlantaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    unidadeId: null,
    nome: faker.datatype.string(60),
    quantidadePosicoes: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePlantasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePlantaData(overide)
    }
  )
}
