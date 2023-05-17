import { faker } from '@faker-js/faker'

export function generateNewDocumentoData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nip: faker.datatype.string(40),
    caixaArqbr: faker.datatype.string(40),
    conteudoQrCode: faker.datatype.string(1024),
    statusId: null,
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nip: faker.datatype.string(40),
    caixaArqbr: faker.datatype.string(40),
    conteudoQrCode: faker.datatype.string(1024),
    statusId: null,
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateDocumentoData(overide)
    }
  )
}
