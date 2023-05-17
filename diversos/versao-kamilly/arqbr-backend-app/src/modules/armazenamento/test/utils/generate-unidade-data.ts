import { faker } from '@faker-js/faker'

export function generateNewUnidadeData(overide = {}) {
  return {
    estadoId: null,
    cidadeId: null,
    nome: faker.datatype.string(60),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUnidadeData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    estadoId: null,
    cidadeId: null,
    nome: faker.datatype.string(60),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUnidadesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUnidadeData(overide)
    }
  )
}
