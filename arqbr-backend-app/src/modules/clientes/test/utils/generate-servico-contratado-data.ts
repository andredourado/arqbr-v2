import { faker } from '@faker-js/faker'

export function generateNewServicoContratadoData(overide = {}) {
  return {
    clienteId: null,
    descricao: faker.datatype.string(60),
    sla: faker.datatype.string(60),
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
    descricao: faker.datatype.string(60),
    sla: faker.datatype.string(60),
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
