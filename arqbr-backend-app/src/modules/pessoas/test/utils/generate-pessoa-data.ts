import { faker } from '@faker-js/faker'

export function generateNewPessoaData(overide = {}) {
  return {
    unidadeId: null,
    nome: faker.datatype.string(60),
    email: faker.datatype.string(60),
    funcaoId: null,
    gerente: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePessoaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    unidadeId: null,
    nome: faker.datatype.string(60),
    email: faker.datatype.string(60),
    funcaoId: null,
    gerente: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePessoasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePessoaData(overide)
    }
  )
}
