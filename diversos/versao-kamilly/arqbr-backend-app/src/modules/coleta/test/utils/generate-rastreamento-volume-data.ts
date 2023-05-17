import { faker } from '@faker-js/faker'

export function generateNewRastreamentoVolumeData(overide = {}) {
  return {
    volumeId: null,
    dataMovimentacao: new Date(),
    horaMovimentacao: new Date(),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateRastreamentoVolumeData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    volumeId: null,
    dataMovimentacao: new Date(),
    horaMovimentacao: new Date(),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateRastreamentoVolumesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateRastreamentoVolumeData(overide)
    }
  )
}
