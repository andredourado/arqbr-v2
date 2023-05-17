import { faker } from '@faker-js/faker'

export function generateNewCampoDocumentoData(overide = {}) {
  return {
    tipoDocumentoId: null,
    nomeCampo: faker.datatype.string(60),
    titulo: faker.datatype.string(60),
    metodoExtracao: faker.datatype.string(30),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCampoDocumentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    tipoDocumentoId: null,
    nomeCampo: faker.datatype.string(60),
    titulo: faker.datatype.string(60),
    metodoExtracao: faker.datatype.string(30),
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
