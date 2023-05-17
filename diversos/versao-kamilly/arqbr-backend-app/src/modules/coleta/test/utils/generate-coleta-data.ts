import { faker } from '@faker-js/faker'

export function generateNewColetaData(overide = {}) {
  return {
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    solicitanteId: null,
    pontoColetaId: null,
    identificador: faker.datatype.string(40),
    dataProgramadaColeta: new Date(),
    horaProgramadaColeta: new Date(),
    veiculoId: null,
    entregadorId: null,
    dataEfetivaColeta: new Date(),
    horaEfetivaColeta: new Date(),
    arquivoFotoProtocolo: faker.datatype.string(255),
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateColetaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    solicitanteId: null,
    pontoColetaId: null,
    identificador: faker.datatype.string(40),
    dataProgramadaColeta: new Date(),
    horaProgramadaColeta: new Date(),
    veiculoId: null,
    entregadorId: null,
    dataEfetivaColeta: new Date(),
    horaEfetivaColeta: new Date(),
    arquivoFotoProtocolo: faker.datatype.string(255),
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateColetasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateColetaData(overide)
    }
  )
}
