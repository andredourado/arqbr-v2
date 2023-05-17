export interface VersaoDocumentoInterface {
  id?: number
  clienteId?: string
  contratoId?: string
  departamentoId?: string
  tipoDocumentoId?: string
  descricaoVersao?: string
  qrcode?: string
  pessoaId?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
