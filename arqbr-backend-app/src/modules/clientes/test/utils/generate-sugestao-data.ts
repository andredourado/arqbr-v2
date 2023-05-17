import { faker } from '@faker-js/faker'

export function generateNewSugestaoData(overide = {}) {
  return {
    clienteId: null,
    departamentoId: null,
    solicitanteId: null,
    titulo: faker.datatype.string(60),
    descricao: faker.datatype.string(1024),
    atendido: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSugestaoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    departamentoId: null,
    solicitanteId: null,
    titulo: faker.datatype.string(60),
    descricao: faker.datatype.string(1024),
    atendido: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSugestoesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateSugestaoData(overide)
    }
  )
}
