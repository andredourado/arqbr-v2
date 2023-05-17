import { faker } from '@faker-js/faker'

export function generateNewVersaoDocumentoData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    descricaoVersao: faker.datatype.string(60),
    qrcode: faker.datatype.string(60),
    pessoaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVersaoDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    pessoaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVersoesDocumentoData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateVersaoDocumentoData(overide)
    }
  )
}
