interface ICampoDocumentoDTO {
  id?: string
  versaoDocumentoId?: string
  nomeCampo?: string
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

export { ICampoDocumentoDTO }
