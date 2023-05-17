import { faker } from '@faker-js/faker'

export function generateNewDocumentoDigitalCampoData(overide = {}) {
  return {
    documentoDigitalId: null,
    campoId: null,
    conteudo: faker.datatype.string(1024),
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentoDigitalCampoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    documentoDigitalId: null,
    campoId: null,
    conteudo: faker.datatype.string(1024),
    pessoaId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentosDigitaisCamposData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateDocumentoDigitalCampoData(overide)
    }
  )
}
