import { faker } from '@faker-js/faker'

export function generateNewPosicaoData(overide = {}) {
  return {
    unidadeId: null,
    plantaId: null,
    rua: faker.datatype.string(20),
    linha: faker.datatype.string(20),
    coluna: faker.datatype.string(20),
    posicoes: faker.datatype.number({ max: 9 }),
    posicoesDisponíveis: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePosicaoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    unidadeId: null,
    plantaId: null,
    rua: faker.datatype.string(20),
    linha: faker.datatype.string(20),
    coluna: faker.datatype.string(20),
    posicoes: faker.datatype.number({ max: 9 }),
    posicoesDisponíveis: faker.datatype.number({ max: 9 }),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePosicoesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePosicaoData(overide)
    }
  )
}
