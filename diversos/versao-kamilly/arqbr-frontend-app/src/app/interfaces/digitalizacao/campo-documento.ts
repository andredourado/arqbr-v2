export interface CampoDocumentoInterface {
  id?: number
  versaoDocumentoId?: string
  nomeCampo?: string
  nomeArquivo?: string
  identificador?: string
  cantoSuperiorX?: number
  cantoSuperiorY?: number
  cantoInferiorX?: number
  cantoInferiorY?: number
  conteudoParaValidacao?: string
  pessoaId?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
