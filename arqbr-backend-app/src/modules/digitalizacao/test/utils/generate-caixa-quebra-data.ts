import { faker } from '@faker-js/faker'

export function generateNewCaixaQuebraData(overide = {}) {
  return {
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivoOrigem: faker.datatype.string(1024),
    sequencia: faker.datatype.number({ max: 9 }),
    paginaInicial: faker.datatype.number({ max: 9 }),
    paginaFinal: faker.datatype.number({ max: 9 }),
    status: faker.datatype.string(20),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCaixaQuebraData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivoOrigem: faker.datatype.string(1024),
    sequencia: faker.datatype.number({ max: 9 }),
    paginaInicial: faker.datatype.number({ max: 9 }),
    paginaFinal: faker.datatype.number({ max: 9 }),
    status: faker.datatype.string(20),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCaixasQuebrasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCaixaQuebraData(overide)
    }
  )
}
