import { faker } from '@faker-js/faker'

export function generateNewTipoDocumentoData(overide = {}) {
  return {
    clienteId: null,
    departamentoId: null,
    descricao: faker.datatype.string(60),
    identificador: faker.datatype.string(30),
    estrategiaQuebra: faker.datatype.string(1024),
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
    departamentoId: null,
    descricao: faker.datatype.string(60),
    identificador: faker.datatype.string(30),
    estrategiaQuebra: faker.datatype.string(1024),
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
