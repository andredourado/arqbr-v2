import { faker } from '@faker-js/faker'

export function generateNewCampoDocumentoData(overide = {}) {
  return {
    versaoDocumentoId: null,
    nomeCampo: faker.datatype.string(60),
    identificador: faker.datatype.string(60),
    cantoSuperiorX: faker.datatype.number({ max: 9 }),
    cantoSuperiorY: faker.datatype.number({ max: 9 }),
    cantoInferiorX: faker.datatype.number({ max: 9 }),
    cantoInferiorY: faker.datatype.number({ max: 9 }),
    conteudoParaValidacao: faker.datatype.string(1024),
    pessoaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCampoDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    versaoDocumentoId: null,
    nomeCampo: faker.datatype.string(60),
    identificador: faker.datatype.string(60),
    cantoSuperiorX: faker.datatype.number({ max: 9 }),
    cantoSuperiorY: faker.datatype.number({ max: 9 }),
    cantoInferiorX: faker.datatype.number({ max: 9 }),
    cantoInferiorY: faker.datatype.number({ max: 9 }),
    conteudoParaValidacao: faker.datatype.string(1024),
    pessoaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCamposDocumentoData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCampoDocumentoData(overide)
    }
  )
}
