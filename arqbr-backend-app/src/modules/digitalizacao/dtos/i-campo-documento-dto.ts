interface ICampoDocumentoDTO {
  id?: string
  tipoDocumentoId?: string
  nomeCampo?: string
  titulo?: string
  metodoExtracao?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { ICampoDocumentoDTO }
