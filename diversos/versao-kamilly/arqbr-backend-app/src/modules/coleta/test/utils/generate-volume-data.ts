import { faker } from '@faker-js/faker'

export function generateNewVolumeData(overide = {}) {
  return {
    coletaId: null,
    identificador: faker.datatype.string(40),
    arquivoFoto: faker.datatype.string(255),
    comentario: faker.datatype.string(1024),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVolumeData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    coletaId: null,
    identificador: faker.datatype.string(40),
    arquivoFoto: faker.datatype.string(255),
    comentario: faker.datatype.string(1024),
    localDeArmazenagem: null,
    statusId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVolumesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateVolumeData(overide)
    }
  )
}
