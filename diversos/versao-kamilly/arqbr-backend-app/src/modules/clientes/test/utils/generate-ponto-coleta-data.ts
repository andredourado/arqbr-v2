import { faker } from '@faker-js/faker'

export function generateNewPontoColetaData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    descricao: faker.datatype.string(60),
    estadoId: null,
    cidadeId: null,
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    pessoaContatoNome: faker.datatype.string(60),
    pessoaContatoCelular: faker.datatype.string(20),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePontoColetaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    descricao: faker.datatype.string(60),
    estadoId: null,
    cidadeId: null,
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    pessoaContatoNome: faker.datatype.string(60),
    pessoaContatoCelular: faker.datatype.string(20),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePontosColetaData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePontoColetaData(overide)
    }
  )
}
