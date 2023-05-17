import { faker } from '@faker-js/faker'

export function generateNewFrequenciaData(overide = {}) {
  return {
    descricao: faker.datatype.string(60),
    espacoEmDias: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFrequenciaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    descricao: faker.datatype.string(60),
    espacoEmDias: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFrequenciasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateFrequenciaData(overide)
    }
  )
}
