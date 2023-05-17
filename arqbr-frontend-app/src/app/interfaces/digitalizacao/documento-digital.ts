export interface DocumentoDigitalInterface {
  id?: number
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
