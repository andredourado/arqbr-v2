import { faker } from '@faker-js/faker'

export function generateNewFrequenciaColetaData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    frequenciaId: null,
    diasDoMes: faker.datatype.string(100),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFrequenciaColetaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    frequenciaId: null,
    diasDoMes: faker.datatype.string(100),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFrequenciaColetasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateFrequenciaColetaData(overide)
    }
  )
}
