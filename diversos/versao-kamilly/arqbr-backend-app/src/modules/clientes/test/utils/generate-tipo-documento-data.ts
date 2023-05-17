import { faker } from '@faker-js/faker'

export function generateNewTipoDocumentoData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    descricao: faker.datatype.string(60),
    composicaoLoteId: null,
    numeroPaginas: faker.datatype.number({ max: 9 }),
    mascaraNomeArquivo: faker.datatype.string(255),
    prazoDescarteAnos: faker.datatype.string(4),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTipoDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    descricao: faker.datatype.string(60),
    composicaoLoteId: null,
    numeroPaginas: faker.datatype.number({ max: 9 }),
    mascaraNomeArquivo: faker.datatype.string(255),
    prazoDescarteAnos: faker.datatype.string(4),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateTiposDocumentoData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateTipoDocumentoData(overide)
    }
  )
}
