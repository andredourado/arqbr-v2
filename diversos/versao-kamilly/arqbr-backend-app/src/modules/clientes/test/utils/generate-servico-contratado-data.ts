import { faker } from '@faker-js/faker'

export function generateNewServicoContratadoData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    servicoId: null,
    unidadeSlaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateServicoContratadoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    servicoId: null,
    unidadeSlaId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateServicosContratadosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateServicoContratadoData(overide)
    }
  )
}
