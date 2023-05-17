import { faker } from '@faker-js/faker'

export function generateNewEntregadorData(overide = {}) {
  return {
    cpfCnpj: faker.datatype.string(20),
    nome: faker.datatype.string(60),
    email: faker.datatype.string(100),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    telefonesFixos: faker.datatype.string(100),
    celular: faker.datatype.string(20),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEntregadorData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    cpfCnpj: faker.datatype.string(20),
    nome: faker.datatype.string(60),
    email: faker.datatype.string(100),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    telefonesFixos: faker.datatype.string(100),
    celular: faker.datatype.string(20),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEntregadoresData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateEntregadorData(overide)
    }
  )
}
