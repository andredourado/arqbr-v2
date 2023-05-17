import { faker } from '@faker-js/faker'

export function generateNewStatusData(overide = {}) {
  return {
    servicoId: null,
    sequencia: faker.datatype.string(4),
    descricao: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStatusData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    servicoId: null,
    sequencia: faker.datatype.string(4),
    descricao: faker.datatype.string(60),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStatusesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateStatusData(overide)
    }
  )
}
