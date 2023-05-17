import { faker } from '@faker-js/faker'

export function generateNewEscalaData(overide = {}) {
  return {
    pessoaId: null,
    jornadaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEscalaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    pessoaId: null,
    jornadaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEscalasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateEscalaData(overide)
    }
  )
}
