interface IVersaoDocumentoDTO {
  id?: string
  clienteId?: string
  contratoId?: string
  departamentoId?: string
  tipoDocumentoId?: string
  descricaoVersao?: string
  qrcode?: string
  squares?: JSON 
  file?: string 
  pageQuantity?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IVersaoDocumentoDTO }
