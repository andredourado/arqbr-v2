interface ICaixaQuebraDTO {
  id?: string
  clienteId?: string
  departamentoId?: string
  tipoDocumentoId?: string
  nomeArquivoOrigem?: string
  sequencia?: number
  paginaInicial?: number
  paginaFinal?: number
  status?: string
  quebras?: any[]
  createdAt?: Date
  updatedAt?: Date
}

export { ICaixaQuebraDTO }
