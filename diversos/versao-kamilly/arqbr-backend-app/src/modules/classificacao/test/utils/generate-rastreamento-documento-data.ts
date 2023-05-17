import { faker } from '@faker-js/faker'

export function generateNewRastreamentoDocumentoData(overide = {}) {
  return {
    volumeId: null,
    dataMovimentacao: new Date(),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateRastreamentoDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    volumeId: null,
    dataMovimentacao: new Date(),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateRastreamentoDocumentosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateRastreamentoDocumentoData(overide)
    }
  )
}
