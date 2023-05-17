interface IDocumentoDigitalDTO {
  id?: string
  clienteId?: string
  departamentoId?: string
  tipoDocumentoId?: string
  nomeArquivo?: string
  nomeArquivoOrigem?: string
  conteudoEmTexto?: string
  numeroPaginas?: number
  solicitacaoFisico?: boolean
  dataSolicitacao?: Date
  solicitanteId?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IDocumentoDigitalDTO }
