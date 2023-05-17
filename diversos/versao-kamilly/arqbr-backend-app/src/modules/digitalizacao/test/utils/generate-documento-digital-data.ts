import { faker } from '@faker-js/faker'

export function generateNewDocumentoDigitalData(overide = {}) {
  return {
    dataDigitalizacao: new Date(),
    versaoDocumentoId: null,
    nip: faker.datatype.string(40),
    conteudoQrCode: faker.datatype.string(1024),
    nomeArquivo: faker.datatype.string(1024),
    pessoaId: null,
    conteudoEmTexto: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentoDigitalData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    dataDigitalizacao: new Date(),
    versaoDocumentoId: null,
    nip: faker.datatype.string(40),
    conteudoQrCode: faker.datatype.string(1024),
    nomeArquivo: faker.datatype.string(1024),
    pessoaId: null,
    conteudoEmTexto: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentosDigitaisData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateDocumentoDigitalData(overide)
    }
  )
}
