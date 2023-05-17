import { faker } from '@faker-js/faker'

export function generateNewAfastamentoData(overide = {}) {
  return {
    pessoaId: null,
    tipoAfastamentoId: null,
    inicio: new Date(),
    fim: new Date(),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateAfastamentoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    pessoaId: null,
    tipoAfastamentoId: null,
    inicio: new Date(),
    fim: new Date(),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateAfastamentosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateAfastamentoData(overide)
    }
  )
}
