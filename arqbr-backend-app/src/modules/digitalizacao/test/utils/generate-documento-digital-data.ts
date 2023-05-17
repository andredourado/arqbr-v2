import { faker } from '@faker-js/faker'

export function generateNewDocumentoDigitalData(overide = {}) {
  return {
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivo: faker.datatype.string(1024),
    nomeArquivoOrigem: faker.datatype.string(1024),
    conteudoEmTexto: faker.datatype.string(1024),
    numeroPaginas: faker.datatype.number({ max: 9 }),
    solicitacaoFisico: false,
    dataSolicitacao: new Date(),
    solicitanteId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentoDigitalData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivo: faker.datatype.string(1024),
    nomeArquivoOrigem: faker.datatype.string(1024),
    conteudoEmTexto: faker.datatype.string(1024),
    numeroPaginas: faker.datatype.number({ max: 9 }),
    solicitacaoFisico: false,
    dataSolicitacao: new Date(),
    solicitanteId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDocumentosDigitaisData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateDocumentoDigitalData(overide)
    }
  )
}
