import { faker } from '@faker-js/faker'

export function generateNewClienteData(overide = {}) {
  return {
    cnpj: faker.datatype.string(14),
    nomeFantasia: faker.datatype.string(60),
    razaoSocial: faker.datatype.string(60),
    inscricaoEstadual: faker.datatype.string(12),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    cep: faker.datatype.string(10),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateClienteData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    cnpj: faker.datatype.string(14),
    nomeFantasia: faker.datatype.string(60),
    razaoSocial: faker.datatype.string(60),
    inscricaoEstadual: faker.datatype.string(12),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    cep: faker.datatype.string(10),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateClientesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateClienteData(overide)
    }
  )
}
