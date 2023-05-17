import { faker } from '@faker-js/faker'

export function generateNewTimeColetaData(overide = {}) {
  return {
    coletaId: null,
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTimeColetaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    coletaId: null,
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTimesColetaData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateTimeColetaData(overide)
    }
  )
}
