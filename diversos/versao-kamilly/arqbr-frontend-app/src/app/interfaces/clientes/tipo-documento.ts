export interface TipoDocumentoInterface {
  id?: number
  clienteId?: string
  contratoId?: string
  departamentoId?: string
  descricao?: string
  composicaoLoteId?: string
  numeroPaginas?: number
  mascaraNomeArquivo?: string
  prazoDescarteAnos?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
