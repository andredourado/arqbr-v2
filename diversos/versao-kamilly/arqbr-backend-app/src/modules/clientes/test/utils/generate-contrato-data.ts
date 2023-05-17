import { faker } from '@faker-js/faker'

export function generateNewContratoData(overide = {}) {
  return {
    clienteId: null,
    identificador: faker.datatype.string(20),
    aceitaServicosTerceiros: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateContratoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    identificador: faker.datatype.string(20),
    aceitaServicosTerceiros: false,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateContratosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateContratoData(overide)
    }
  )
}
